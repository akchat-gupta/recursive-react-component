import { nodes } from "./data";
import FileSystemItems from "./FileSystemItems";

function App() {
  return (
    <div className="p-8 max-w-sm mx-auto">
      <ul className="list-none">
        {nodes.map((node) => (
          <FileSystemItems node={node} key={node.name} />
        ))}
      </ul>
    </div>
  );
}

export default App;
