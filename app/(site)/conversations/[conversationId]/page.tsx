import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import { EmptyState } from "@/app/components";
import Header from './components/Header';
import Body from './components/Body';
import Form from './components/Form';
import { Metadata } from 'next';

interface IParams {
    conversationId: string;
}

export async function generateMetadata({ params }: { params: IParams }): Promise<Metadata> {
    return {
        title: params.conversationId,
    };
}

const ConversationId = async ({ params }: { params: IParams }) => {
    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);

    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        );
    }

    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header conversation={conversation} />
                <Body initialMessages={messages} />
                <Form />
            </div>
        </div>
    );
};

export default ConversationId;
