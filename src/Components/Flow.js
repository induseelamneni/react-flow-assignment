
import { useCallback ,useState} from 'react';

import  {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  applyNodeChanges,
  reconnectEdge,
} from '@xyflow/react';
import 'reactflow/dist/style.css';

const getNodeId = () => `${String(+new Date()).slice(6)}`;

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2',label: 'This edge can only be updated from source',reconnectable: 'source', },{
  id: 'e2-4',
  source: '2',
  target: '4',
  label: 'This edge can only be updated from target',
  reconnectable: 'target',
},
{
  id: 'e5-6',
  source: '5',
  target: '6',
  label: 'This edge can be updated from both sides',
},];

function Flow() {
  const [nodes, setNodes] = useNodesState(initialNodes);
  console.log(setNodes)
  const [edges, setEdges] = useEdgesState(initialEdges);

  
  const [state, setState] = useState({ text: "" });
  const [editState, setEditState, onEdgesChange] = useState({id:"",  text: "" });

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );


  const onReconnect = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [setEdges],
  );

  const onEdit = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === editState.id) {
          node.data = {
            ...node.data,
            label: `${node.id} - ${editState.name}`
          };
        }

        return node;
      })
    );
  };

  const onAdd = () => {
    const id = getNodeId();
    const newNode = {
      id,
      data: { label: `${id} - ${state.name} ` },
      position: {
        x: 0,
        y: 0 + (nodes.length + 1) * 20
      }
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
  
  
    <div style={{ height: 800 }} className='flex flex-row'>
     
     
    <ReactFlow
      nodes={nodes}
      edges={edges}
      snapToGrid
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      onReconnect={onReconnect}
      onConnect={onConnect}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>

    <div style={{width:200}}>
    <div>
      Text:{" "}
      <input
        type="text"
        onChange={(e) => {
          setState((prev) => ({ ...prev, name: e.target.value }));
        }}
        className='w-full border-black'
        placeholder='Enter Your Node Text'
      />
     
      <button onClick={onAdd} className='bg-blue-500 p-3 m-2 rounded-lg'>add node</button>
      <br />
      Id:{" "}
      <input
        type="text"
        onChange={(e) => {
          setEditState((prev) => ({ ...prev, id: e.target.value }));
        }}
        className='w-full border-black'
         placeholder='Enter Id of node which you want to edit text'
      />
      text:{" "}
      <input
        type="text"
        onChange={(e) => {
          setEditState((prev) => ({ ...prev, name: e.target.value }));
        }}
        className='w-full border-black'
        placeholder='Enter text'
      />
     
      <button onClick={onEdit} className='bg-blue-500 p-3 m-2 rounded-lg'>Edit node</button>
      <div style={{ width: "500px", height: "500px" }}>
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} />
      </div>
      </div>
    </div> 
    </div>
    
    
  
  );
}
export default Flow