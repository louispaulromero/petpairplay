import TalkWithRabbit from "./TalkWithRabbit";

const TestTalkRabbit = ()=>{

    const rabbitId = 'rabbit1';
    const hunger= 30;
    const toilet = 40;
    const hapiness = 50;

    const feeditem='grass';

    return (
        <div>
            <TalkWithRabbit
            rabbitId={rabbitId}
            hunger={hunger}
            toilet={toilet}
            hapiness={hapiness}
            feeditem={feeditem}
            />
        </div>
    )
}
export default TestTalkRabbit;