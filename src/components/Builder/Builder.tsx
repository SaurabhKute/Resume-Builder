import Form from "../Form/Form";
import Resume from "../Resume/Resume";

export default function Builder () {
    return (
        <div style={{
            marginTop: '40px', 
            display: 'flex', 
            height: '100%' 
        }}>
            <Form/>
            <Resume/>
        </div>
    )
}
