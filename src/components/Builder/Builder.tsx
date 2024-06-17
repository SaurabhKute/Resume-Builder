import Form from "../Form/Form";
import Resume from "../Resume/Resume";

export default function Builder () {
    return (
        <div style={{
            marginTop: '40px', 
            // border: '1px solid black', 
            display: 'flex', 
            // justifyContent: 'center', 
            // alignItems: 'center', 
            height: '100vh' //  Ensure full height to center vertically
            // height:'500px'
        }}>
            <Form/>
            <Resume/>
        </div>
    )
}
