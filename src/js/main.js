(function(exports){
console.log(exports);

var test = new Vue({
		el: '.test',
        template: '<h1>1. Vue Template</h1>'
});

var test2 = new Vue({
		el: '.test2',
        template: 
        '<div>\
        <h1>Vue Template with Multplate lines</h1>\
        <h2>another h2 tag</h2>\
        </div>\
        '
});

var data = new Vue({
    el: '.data',
    template:
    '<div>\
    <h1>Vue Template with data bind</h1>\
    {{data}}\
    </div>\
    ',
    data: function(){
        return { data: "my data return from data function"};
    }
});

function getData(){
    return "hi from getData() function";
}

function getArray(){
    return [
        { book: "sky", pages: 50},
        { book: "moon", pages: 300}
    ]
}

Vue.component("test", {
    template:
    '<div>\
    <h1>My fist Vue Component</h1>\
    </div>\
    '
})

var vueUseComponent = new Vue({
    el: '#myComponent'
})


var moreData = new Vue({
    el: '.moreData',
    template:
    '<div>\
    <h1>more data binding</h1>\
    <p>FirstName: {{firstName}}</p>\
    <p>Age: {{age}}</p>\
    <p>value: {{value}}</p>\
    <ul>\
        <li v-for="item in list.books">\
        {{item.book}} - {{item.pages}}\
        </li>\
    </ul>\
    </div>\
    ',
    data: function(){
        return {
            firstName: "mike",
            age: "100",
            value: "",
            list: {
                books: []
            }
        }
    },
    created: function(){
        this.value = getData();
        this.list.books = getArray();
    }
});
exports.moreData = moreData;
})(window);