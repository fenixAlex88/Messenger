import Sidebar from "@/app/components/Sidebar/Sidebar";
import ConvetsationList from './components/ConvetsationList';
import getConversation from '@/app/actions/getConversations';

export default async function ConversationLayout({ children }: { children: React.ReactNode }) {
	const conversations = await getConversation();
    return (
        <Sidebar>
            <div className="h-full">
                <ConvetsationList initialItems={conversations} />
                {children}
            </div>
        </Sidebar>
    );
}
