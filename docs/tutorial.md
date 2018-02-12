# prerequisites

### for NodeJs
     var TreeOps=require("tree-operations");

### for browser

    <script src="node_modules/find-polyfill/distrib/find-polyfill.min.js"></script>
 
    <script src="node_modules/tree-operations/distrib/tree-operations.min.js"></script>


# Methods
## fromArray

    TreeOps.fromArray(arr,predicateChild, childrenPropertyName);

    arr:
    flat array of objects

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

    var tree = TreeOps.fromArray(
        arr,
        (node, parentNode) => node.parent === parentNode.id,
        "childrens" 
    );


### example

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

    var tree = TreeOps.fromArray(
        flatten,
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
        ];
    }
]


## toFlatArray

    TreeOps.toFlatArray(tree, childrenPropertyName, reversible)
where

    tree: hierarchical array

    childrenPropertyName: name of new property in each node to store childrens. Default is "childs".

    reversible (boolean): if true, include _id & _parentId to each object of flat array for reversible to tree. Default is false.

### example

    var tree = [{
        "title": "Title 1",
        "childrens": [{
            "title":"Title 1.1",
            "childrens": [{ "title": "Title 1.1.1" },
            { "title": "Title 1.1.2" },
            { "title": "Title 1.1.3" }
            ]
        },
        {
            "title": "Title 1.2",
            "childrens": [{
            "title": "Title 1.2.1",
            "childrens": [{
                "title": "Title 1.2.1.3",
                "childrens": [{
                    "title": "Title 1.2.1.3.1"
                    },
                    { "title": "Title 1.2.1.3.2" }
                ]
                },
                { "title": "Title 1.2.1.1" },
                { "title": "Title 1.2.1.2" }
            ]
            }]
        },
        { "title": "Title 1.3" }
        ]
    },
    {
        "title": "Title 2",
        "childrens": [{ "title": "Title 2.1" }]
    }
    ];

    var list = TreeOps.toFlatArray(
    tree,
    "childrens",
    false
    );

/*
   
    [
        {"title":"Title 1"},
        {"title":"Title 1.1"},
        {"title":"Title 1.1.1"},
        {"title":"Title 1.1.2"},
        {"title":"Title 1.1.3"},
        {"title":"Title 1.2"},
        {"title":"Title 1.2.1"},
        {"title":"Title 1.2.1.3"},
        {"title":"Title 1.2.1.3.1"},
        {"title":"Title 1.2.1.3.2"},
        {"title":"Title 1.2.1.1"},
        {"title":"Title 1.2.1.2"},
        {"title":"Title 1.3"},
        {"title":"Title 2"},
        {"title":"Title 2.1"}
    ]
*/
## find

    TreeOps.find(tree, predicateFind, predicateChild, childrenPropertyName = "childs")
where

    tree: hierarchical array

    predicateFind: function with 1 parameter (a node) that returns true if the node matches the search

    predicateChild: function has 2 parameters (2 array elements) that returns true if they are linked by the parent / child relationship.

    childrenPropertyName: name of new property in each node to store childrens. Default is "childs".

    reversible (boolean): if true, include _id & _parentId to each object of flat array for reversible to tree. Default is false.

### example  

    var tree = [{
    "id": 1,
    "parent": 0,
    "title": "Title 1",
    "childrens": [{
        "id": 11,
        "parent": 1,
        "title": "Title 1.1",
        "childrens": [
            { "id": 111, "parent": 11, "title": "Title 1.1.1" },
            {
            "id": 112,
            "parent": 11,
            "title": "Title 1.1.2",
            "childrens": [
                { "id": 1121, "parent": 112, "title": "Title 1.1.2.1" }
            ]
            },
            { "id": 113, "parent": 11, "title": "Title 1.1.3" }
        ]
        },
        {
        "id": 12,
        "parent": 1,
        "title": "Title 1.2",
        "childrens": [
            { "id": 121, "parent": 12, "title": "Title 1.2.1" }
        ]
        },
        { "id": 13, "parent": 1, "title": "Title 1.3" }
    ]
}];


    var node1 = TreeOps.find(
        tree,
        x => x.id === 1,
        (node, parentNode) => node.parent === parentNode.id,
        "childrens"
    )

    var node13 = TreeOps.find(
        tree,
        x => x.id === 13,
        (node, parentNode) => node.parent === parentNode.id,
        "childrens"
    )


    var node112 = TreeOps.find(
        tree,
        x => x.id === 112,
        (node, parentNode) => node.parent === parentNode.id,
        "childrens"
    )

    var parentOf112 = TreeOps.find(
        tree,
        x => x.childrens && x.childrens.find(y => y.id === 112),
        (node, parentNode) => node.parent === parentNode.id,
        "childrens"
    )

    /*
        node1  {"id":1,"parent":0,"title":"Title 1","childrens":[{"id":11,"parent":1,"title":"Title 1.1","childrens":[{"id":111,"parent":11,"title":"Title 1.1.1"},{"id":112,"parent":11,"title":"Title 1.1.2","childrens":[{"id":1121,"parent":112,"title":"Title 1.1.2.1"}]},{"id":113,"parent":11,"title":"Title 1.1.3"}]},{"id":12,"parent":1,"title":"Title 1.2","childrens":[{"id":121,"parent":12,"title":"Title 1.2.1"}]},{"id":13,"parent":1,"title":"Title 1.3"}]}


    node13 {"id":13,"parent":1,"title":"Title 1.3"}


    node112 {"id":112,"parent":11,"title":"Title 1.1.2","childrens":[{"id":1121,"parent":112,"title":"Title 1.1.2.1"}]}


    parentOf112 {"id":11,"parent":1,"title":"Title 1.1","childrens":[{"id":111,"parent":11,"title":"Title 1.1.1"},{"id":112,"parent":11,"title":"Title 1.1.2","childrens":[{"id":1121,"parent":112,"title":"Title 1.1.2.1"}]},{"id":113,"parent":11,"title":"Title 1.1.3"}]}

    */