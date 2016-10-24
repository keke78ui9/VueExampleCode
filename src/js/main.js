(function(exports){
console.log(exports);

var test = new Vue({
		el: '.test',
        template: '<h1>Vue Template</h1>'
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

function getTitle() {
    return "get from title";
};

Vue.component('my-compnent', {
    template: '\
    <div>\
<h1>Vue template with ajax update</h1>\
<h3>{{title}}</h3>\
<h3>{{titleFromMethod}}</h3>\
<h3>{{titleFromAjax}}</h3>\
</div>\
',
    data: function() {
        return {
            title: "init title",
            titleFromMethod: "title from method",
            titleFromAjax: "title from ajax (will be update after 10 sec)"
        }
    },
    created: function () {
        this.title = "in ready";
        this.titleFromMethod = getTitle();
        var self = this;

        $.ajax("http://pokeapi.co/api/v2/").done(function (data) {
            console.info(data);
            setTimeout(function () {
                self.titleFromAjax = data.ability + "--- from ajax call";
            }, 10000);

        });
    }
});

new Vue({
    el: '#example_test'
});

Vue.component('component-input',{
    props: ['message', "myOtherMsg"],
    template: '<div>{{message}} - {{myOtherMsg}}</div>'
})

Vue.component('component-item',{
    props: ['firstName', "lastName", "age", "height", "weight", "birth"],
    template: '\
    <div>\
    <div>firstName: {{firstName}}</div>\
    <div>lastName: {{lastName}}</div>\
    <div>age: {{age}}</div>\
    <div>height: {{height}}</div>\
    <div>weight: {{weight}}</div>\
    <div>birth: {{birth}}</div>\
    </div>\
    '
})


Vue.component('component-object',{
    props: ['dobject'],
    template: '<div>\
    <h1>Component with Json input to Props</h1>\
    <div>{{dobject.name}}</div>\
    <div>{{dobject.age}}</div>\
    <div>{{dobject.email}}</div>\
    </div>\
    '
})
new Vue({
    el: '#component-input'
});

Vue.component('component-object2',{
    props: {
        name: String,
        age: Number,
        hasChildren: Boolean,
        schools: Object,
        readBooks: Array
    },
    template: '<div>\
    <h1>Specify types of Props</h1>\
    <div>name: {{name}}</div>\
    <div>age: {{age}}</div>\
    <div>hasChildren: {{hasChildren}}</div>\
    <div>school name: {{schools.name}}</div>\
    <div>scholl location: {{schools.location}}</div>\
    <ul>\
        <li v-for="item in schools.books">\
        {{item.title}}\
        </li>\
    </ul>\
    </div>\
    '
})

Vue.component('c-pokemons',{
    template: '\
    <div>\
    <h1>Pokemon List</h1>\
    <div>click pokemon to get detail pokemon</div>\
    <ul>\
        <li v-for="item in pokemons"><a href="javascript:void(0)" v-on:click="selectPokemon(item)">{{item.name}}</a></li>\
    </ul>\
    <div v-if="pokemon.name">name:  {{pokemon.name}}</div>\
<div v-if="pokemon.species" >species:  {{pokemon.species}}</div>\
    <div v-if="pokemon.weight > 0" >weight:  {{pokemon.weight}}</div>\
    <div v-if="pokemon.height > 0">height:  {{pokemon.height}}</div>\
    <div v-if="pokemon.id > 0">id:  {{pokemon.id}}</div>\
    <div v-if="pokemon.ability">ability:  {{pokemon.ability}}</div>\
    <div v-if="pokemon.types">types:  {{pokemon.types}}</div>\
    </div>\
    ',
    data: function(){
        return {
            pokemons: [],
            pokemon: {
                weight: 0,
                height: 0,
                name: "",
                id :  0,
                ability: "",
                types: "",
                species: ""
            }
        }
    },
    created: function () {
        var self = this;
        $.ajax("http://pokeapi.co/api/v2/pokemon/").done(function (data) {
            console.info(data);
            self.pokemons = data.results;
        });
    },
    methods: {
        selectPokemon: function(item){
                var self = this;
                var me = item;
              $.ajax(item.url).done(function (data) {
                  console.info(data);
                self.pokemon.weight = data.weight;
                self.pokemon.height = data.height;
                self.pokemon.name = item.name;
                self.pokemon.species = data.species.name;
                  self.pokemon.id = data.id;
                var ability = [];
                for (i = 0, len = data.abilities.length; i < len; i++){
                    ability.push(data.abilities[i].ability.name);
                }
                self.pokemon.ability = ability.join(',');
                var types = [];
                for (i = 0, len = data.types.length; i < len; i++){
                    types.push(data.types[i].type.name);
                }
                self.pokemon.types = types.join(',');

        });
        }
    }
})

var object2 = new Vue({
    el: '#app'
});

exports.object2 = object2;


exports.moreData = moreData;
})(window);