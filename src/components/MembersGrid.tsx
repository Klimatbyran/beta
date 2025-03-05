import { Text } from "@/components/ui/text";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

interface MembersGridProps {
  members: TeamMember[];
}

export function MembersGrid({ members }: MembersGridProps) {
  return (
    <div className="bg-black-2 rounded-level-2 p-4 md:p-16 space-y-8 md:space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {members.map((member) => (
          <div
            key={member.name}
            className="bg-black-1 rounded-level-2 p-4 md:p-8 space-y-6"
          >
            <div className="gap-6">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover mb-2"
              />
              <div>
                <Text variant="body">{member.name}</Text>
                <Text variant="body">{member.role}</Text>
                <Text className="text-grey mt-4">{member.description}</Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
