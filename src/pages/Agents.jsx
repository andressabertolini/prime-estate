import Agent1 from "../assets/images/agent1.jpg";
import Agent2 from "../assets/images/agent2.jpg";
import Agent3 from "../assets/images/agent3.jpg";

const agents = [
    {id: 1, name: "John", image: Agent1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed libero consectetur, volutpat ante vitae, pellentesque justo. Ut varius leo nunc, vel lacinia purus finibus ut. Etiam ultricies vulputate enim eget bibendum. Duis dignissim, quam sed hendrerit vehicula, ligula mi egestas turpis, a volutpat risus est at nisl."},
    {id: 2, name: "Sarah", image: Agent2, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed libero consectetur, volutpat ante vitae, pellentesque justo. Ut varius leo nunc, vel lacinia purus finibus ut. Etiam ultricies vulputate enim eget bibendum. Duis dignissim, quam sed hendrerit vehicula, ligula mi egestas turpis, a volutpat risus est at nisl."},
    {id: 3, name: "Ashleigh", image: Agent3, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed libero consectetur, volutpat ante vitae, pellentesque justo. Ut varius leo nunc, vel lacinia purus finibus ut. Etiam ultricies vulputate enim eget bibendum. Duis dignissim, quam sed hendrerit vehicula, ligula mi egestas turpis, a volutpat risus est at nisl."}
];

const Agents = () => {
    return(
        <div className="container">
            <h1>Agents</h1>
            <div className="agents__grid">
                {agents.map((agent) => (
                    <div className="agent" key={agent.id}>
                        <h4>{agent.name}</h4>
                        <img src={agent.image} className="agent-image"/>
                        <p>{agent.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Agents;