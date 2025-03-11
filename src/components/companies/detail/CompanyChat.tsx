import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { Text } from "@/components/ui/text";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { CompanyDetails, ReportingPeriod } from "@/types/company";
import { getChatResponse } from "@/lib/api";

interface Message {
	id: string;
	text: string;
	author: {
		name: string;
		avatar?: string;
	};
	timestamp: Date;
}

interface CompanyChatProps {
	company: CompanyDetails;
	selectedPeriod: ReportingPeriod;
	title: string;
}

export function CompanyChat({ title, company, selectedPeriod }: CompanyChatProps) {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			text: `Hello! I am Garbo, your AI assistant. I'm here if you want to chat about ${company.name}! How can I help you today?`,
			author: {
				name: "AI",
				avatar: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=96&h=96&fit=crop",
			},
			timestamp: new Date(),
		},
	]);
	const [newMessage, setNewMessage] = useState("");
	const [open, setOpen] = useState(false);
	const scrollAreaRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollArea = scrollAreaRef.current;
        scrollArea.scrollTo({
            top: scrollArea.scrollHeight,
            behavior: 'smooth'
        });
    }
}, [messages]); 
	
	const handleSendMessage = async () => {
		if (!newMessage.trim()) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			text: newMessage,
			author: {
				name: "Du",
				avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop",
			},
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setNewMessage("");
		
		const response = await getChatResponse({ url: selectedPeriod.reportURL, message: newMessage });
		const botMessage: Message = {
			id: Date.now().toString(),
			text: response.message,
			author: {
				name: "AI",
				avatar: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=96&h=96&fit=crop",
			},
			timestamp: new Date(),
		};
		setMessages((prev) => [...prev, botMessage]);
	};

	const formatTimestamp = (date: Date) => {
		return new Intl.DateTimeFormat("sv-SE", {
			hour: "2-digit",
			minute: "2-digit",
			day: "numeric",
			month: "short",
		}).format(date);
	};

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="outline" size="sm" className="gap-2">
					{title}
				</Button>
			</SheetTrigger>
			<SheetContent className="w-[400px] sm:w-[540px] bg-black-2 border-none p-0">
				<SheetHeader className="px-6 py-4 border-b border-black-1">
					<div className="flex items-center justify-between">
						<SheetTitle className="text-lg font-light">
							Chatt om {company.name}
						</SheetTitle>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8"
							onClick={() => setOpen(false)}
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</SheetHeader>

				<div className="flex flex-col h-[calc(100vh-64px)]">
					<ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
						<div className="space-y-6">
							{messages.map((message) => (
								<div
									key={message.id}
									className={cn(
										"flex gap-4",
										message.author.name === "Du" &&
											"flex-row-reverse",
									)}
								>
									<Avatar className="h-8 w-8 flex-shrink-0">
										<AvatarImage
											src={message.author.avatar}
										/>
										<AvatarFallback>
											{message.author.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div
										className={cn(
											"space-y-1 max-w-[80%]",
											message.author.name === "Du" &&
												"items-end",
										)}
									>
										<div className="flex items-center gap-2">
											<Text
												variant="small"
												className="font-medium"
											>
												{message.author.name}
											</Text>
											<Text
												variant="small"
												className="text-grey"
											>
												{formatTimestamp(
													message.timestamp,
												)}
											</Text>
										</div>
										<div
											className={cn(
												"rounded-level-2 p-3",
												message.author.name === "Du"
													? "bg-blue-5/30 text-blue-2"
													: "bg-black-1",
											)}
										>
											<Text>{message.text}</Text>
										</div>
									</div>
								</div>
							))}
						</div>
					</ScrollArea>

					<div className="p-4 border-t border-black-1">
						<div className="flex gap-4">
							<Textarea
								value={newMessage}
								onChange={(e) => setNewMessage(e.target.value)}
								placeholder="Skriv ett meddelande..."
								className="min-h-[44px] bg-black-1 border-none resize-none"
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										handleSendMessage();
									}
								}}
							/>
							<Button
								size="icon"
								onClick={handleSendMessage}
								disabled={!newMessage.trim()}
								className="h-11 w-11 shrink-0"
							>
								<Send className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
