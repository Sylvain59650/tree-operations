# tree-operations
create a tree from an array of objects

## Installation

    npm install tree-operations --save

or

    yarn add tree-operations --save

## Usage

    var arr=[{...},{...},{...},...];

    arr.unflatten(predicateChild, childrenPropertyName);

    predicateChild:
    function has 2 parameters (2 array elements) that returns true if they are linked by the parent / child relationship.

    childrenPropertyName:
      name of new property in each node to store childrens. 
      Default is "childs"

      var arr = [
        {id:..., parent:..., prop1:...,prop2:...},
        {id:..., parent:..., prop1:...,prop2:...},
        {id:..., parent:..., prop1:...,prop2:...},
        {id:..., parent:..., prop1:...,prop2:...},
        {id:..., parent:..., prop1:...,prop2:...},
        {id:..., parent:..., prop1:...,prop2:...}
    ];

    I want a tree that 
        links the elements by the id and parent properties,
        the child elements will be in a table named childrens
    So

    var tree = arr.unflatten(
        (node, parentNode) => node.parent === parentNode.id,
        "childrens" 
    );


<a name="nodeexample"></a>
## example for NodeJs

    require("tree-operations");

    var flatten = [
    { id: 1, parent: 0, title: "Title 1" },
    { id: 11, parent: 1, title: "Title 1.1" },
    { id: 111, parent: 11, title: "Title 1.1.1" },
    { id: 112, parent: 11, title: "Title 1.1.2" },
    { id: 113, parent: 11, title: "Title 1.1.3" },
    { id: 1213, parent: 121, title: "Title 1.2.1.3" },
    { id: 12131, parent: 1213, title: "Title 1.2.1.3.1" },
    { id: 12132, parent: 1213, title: "Title 1.2.1.3.2" },
    { id: 2, parent: 0, title: "Title 2" },
    { id: 21, parent: 2, title: "Title 2.1" },
    { id: 12, parent: 1, title: "Title 1.2" },
    { id: 13, parent: 1, title: "Title 1.3" },
    { id: 121, parent: 12, title: "Title 1.2.1" },
    { id: 1211, parent: 121, title: "Title 1.2.1.1" },
    { id: 1212, parent: 121, title: "Title 1.2.1.2" }
    ];

    var tree = flatten.unflatten(
        (node, parentNode) => node.parent === parentNode.id,
        "childrens"
    )

output:

    [
        {
            "id":1,"parent":0,"title":"Title 1",
            "childrens":[
                {
                    "id":11,"parent":1,"title":"Title 1.1",
                    "childrens":[
                        {
                            "id":111,"parent":11,"title":"Title 1.1.1"
                        },
                        {
                            "id":112,"parent":11,"title":"Title 1.1.2"
                        },
                        {
                            "id":113,"parent":11,"title":"Title 1.1.3"
                        }
                    ]
                },
                {
                    "id":12,"parent":1,"title":"Title 1.2",
                    "childrens":[
                        {
                            "id":121,"parent":12,"title":"Title 1.2.1",
                            "childrens":[
                                {
                                    "id":1213,"parent":121,"title":"Title 1.2.1.3",
                                    "childrens":[
                                        {
                                            "id":12131,"parent":1213,"title":"Title 1.2.1.3.1"
                                        },
                                        {
                                            "id":12132,"parent":1213,"title":"Title 1.2.1.3.2"
                                        }
                                    ]
                                },
                                {
                                    "id":1211,"parent":121,"title":"Title 1.2.1.1"
                                },
                                {
                                    "id":1212,"parent":121,"title":"Title 1.2.1.2"
                                }
                            ]
                        }
                    ]
            },
            {
                "id":13,"parent":1,"title":"Title 1.3"
            }
        ]
    },
    {
        "id":2,"parent":0,"title":"Title 2",
        "childrens":[
            {
                "id":21,"parent":2,"title":"Title 2.1"
            }
        ]
    }
]


## example for browser

take [example for NodeJs](#nodeexample) and just replace 

     require("tree-operations");

by

    <script src="node_modules/tree-operations/distrib/tree-operations.min.js"></script>



