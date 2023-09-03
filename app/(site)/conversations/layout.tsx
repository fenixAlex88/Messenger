import Sidebar from "@/app/components/Sidebar/Sidebar";
import ConvetsationList from './components/ConvetsationList';
import getConversation from '@/app/actions/getConversations';
import getUsers from '@/app/actions/getUsers';

export default async function ConversationLayout({ children }: { children: React.ReactNode }) {
	const conversations = await getConversation();
    const users = await getUsers();

    return (
        <Sidebar>
            <div className="h-full">
                <ConvetsationList 
                users={users}
                initialItems={conversations} />
                {children}
            </div>
        </Sidebar>
    );
}
