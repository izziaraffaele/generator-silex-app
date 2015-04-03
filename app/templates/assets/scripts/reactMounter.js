module.exports = {
    mount: function(nodeId, Component, props){
        var node = document.getElementById(nodeId);
        if( node )
        {
            React.render(React.createElement(Component, props || null), node);
        }
    }
};