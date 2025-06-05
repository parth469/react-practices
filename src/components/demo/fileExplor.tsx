"use client";

import { useState } from "react";

type NodeType = "File" | "Folder";

interface Node {
    id: number;
    name: string;
    type: NodeType;
    isOpen: boolean;
    level: number;
    children: Node[];
}

const defaultNode: Node = {
    id: Date.now(),
    name: "Root",
    type: "Folder",
    isOpen: true,
    level: 1,
    children: [],
};

const FolderView = ({
    node,
    onToggle,
    onAdd,
    onRemove,
    updateFileName,
}: {
    node: Node;
    onToggle: (id: number) => void;
    onAdd: (parentId: number, type: NodeType, level: number) => void;
    onRemove: (id: number) => void;
    updateFileName: (id: number, name: string) => void;
}) => {
    const [fileName, setFileName] = useState<string>(node.name);

    return (
        <div className={`ml-${node.level * 2} bg-gray-200 p-1 m-1`}>
            {node.type === "Folder" && (
                <button className="mr-2" onClick={() => onToggle(node.id)}>
                    {node.isOpen ? "📂" : "📁"}
                </button>
            )}
            <input
                className="font-bold"
                value={fileName}
                disabled={node.level === 1}
                onBlur={() => updateFileName(node.id, fileName)}
                onChange={(e) => setFileName(e.target.value)}
            />
            {node.type === "Folder" && (
                <>
                    <button
                        className="ml-2 text-xs bg-gray-400 px-1"
                        onClick={() => onAdd(node.id, "Folder", node.level)}
                    >
                        + Folder
                    </button>
                    <button
                        className="ml-1 text-xs bg-gray-400 px-1"
                        onClick={() => onAdd(node.id, "File", node.level)}
                    >
                        + File
                    </button>
                </>
            )}
            {node.level > 1 && (
                <button
                    className="ml-2 text-xs bg-red-400 p-1"
                    onClick={() => onRemove(node.id)}
                >
                    Remove
                </button>
            )}

            {node.isOpen &&
                node.children.map((child) => (
                    <FolderView
                        key={child.id}
                        node={child}
                        onToggle={onToggle}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        updateFileName={updateFileName}
                    />
                ))}
        </div>
    );
};

export const FileExpoler = () => {
    const [history, setHistory] = useState<Node[]>([defaultNode]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentTree = history[currentIndex];

    const updateTree = (newTree: Node) => {
        const newHistory = history.slice(0, currentIndex + 1);
        newHistory.push(newTree);
        setHistory(newHistory);
        setCurrentIndex(newHistory.length - 1);
    };

    const undo = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const redo = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const toggleFolder = (id: number) => {
        const traverse = (node: Node): Node => {
            if (node.id === id && node.type === "Folder") {
                return { ...node, isOpen: !node.isOpen };
            }
            return { ...node, children: node.children.map(traverse) };
        };
        updateTree(traverse(currentTree));
    };

    const updateFileName = (id: number, name: string) => {
        const traverse = (node: Node): Node => {
            if (node.id === id) {
                return { ...node, name };
            }
            return { ...node, children: node.children.map(traverse) };
        };
        updateTree(traverse(currentTree));
    };

    const addNode = (id: number, type: NodeType, level: number) => {
        const newNode: Node = {
            id: Date.now(),
            name: type === "File" ? "New File" : "New Folder",
            type,
            isOpen: false,
            level: level + 1,
            children: [],
        };

        const insert = (node: Node): Node => {
            if (node.id === id) {
                return { ...node, children: [...node.children, newNode] };
            }
            return { ...node, children: node.children.map(insert) };
        };

        updateTree(insert(currentTree));
    };

    const removeNode = (id: number) => {
        const traverse = (node: Node): Node => ({
            ...node,
            children: node.children
                .filter((child) => child.id !== id)
                .map(traverse),
        });

        updateTree(traverse(currentTree));
    };

    return (
        <div className="p-4 bg-white">
            <h2 className="text-lg font-bold mb-2">File Explorer</h2>
            <div className="mb-2">
                <button
                    className="mr-2 text-xs bg-gray-200 p-1"
                    disabled={currentIndex === 0}
                    onClick={undo}
                >
                    Undo
                </button>
                <button
                    className="text-xs bg-gray-200 p-1"
                    disabled={currentIndex === history.length - 1}
                    onClick={redo}
                >
                    Redo
                </button>
            </div>

            <FolderView
                node={currentTree}
                onToggle={toggleFolder}
                onAdd={addNode}
                onRemove={removeNode}
                updateFileName={updateFileName}
            />
        </div>
    );
};

// Extra 
// Undo/Redo - DONE
// Drag-and-Drop Support
// Search Feature
// keystroke  problem in undo redo logic