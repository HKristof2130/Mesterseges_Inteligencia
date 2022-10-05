from platform import node
from xmlrpc.client import boolean


class Node():
    def __init__(self,value = None, children = None):
        self.value = value
        self.children = children or []

def minimax(root : Node, is_max : bool):

    if root.value is not None:
        return root.value
    if is_max:
        max(map(lambda node : minimax(node, not is_max), root.children))
    else:
        root.value = min( map(lambda node : minimax(node, not is_max), root.childrens))
    return root.value

def print_tree(node : Node , level = 0):
    print("{}{}".format("\t" * level, node.value))
    for child in node.children:
        print_tree(child,level+1)

def main():
    leaf1 = Node(2)
    leaf2 = Node(7)
    leaf3 = Node(1)
    leaf4 = Node(8)
    mid1 = Node(None,[leaf1,leaf2])
    mid2 = Node(None,[leaf3,leaf4])
    root = Node(None,[mid1,mid2])
    print(minimax(root,True))



if __name__ == "__main__":
    main()