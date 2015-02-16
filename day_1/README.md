#Advanced JavaScript

##Object-Oriented Programming with JavaScript
- In other languages such as Ruby or PHP we have a proper class structure for object-oriented programming.
- Classes allow us to encapsulate logic regarding certain functions in a maintainable, testable manner.
- JavaScript was not originally given an inherent object-oriented structure, so it had to be simulated.
- Constructors and prototypes are the tools of the trade to make OOP work with JavaScript.

##Constructors
- Constructors are just that - they construct things. Specifically, they dynamically create objects based on a number of parameters.
- Constructors are written as functions, and generally employ the use of the `this` keyword.
- Let's take for example a car:

```
function Car(make, model, year, color) {
	this.make = make;
	this.model = model;
	this.year = year;
	this.color = color;
}
```

- This is basically a blank slate. The constructor allows us to generate an object with information about any car.

```
var myCar = new Car("Honda", "Civic", 2004, "Red");
```

##Prototypes
- Prototypes allow us to create methods that are attached to our newly-generated objects.
- They usually extend functionality related to that specific "logical concern."
- While thinking about a car, you may do various things with it:

Drive it:

```
Car.prototype.drive = function() {
	console.log("We are driving!");
}
```

Paint it:

```
Car.prototype.paint = function(newColor) {
	this.color = newColor;
	console.log("Our new color is: " + newColor);
}
```

Describe it:

```
Car.prototype.describeCar = function() {
	console.log("We are driving in a " + this.color + " " + this.make + " " + this.model + " that is from the year " + this.year);
}
```

- We can see here that prototypes inherit the scope of their parent constructor.

#####Call a prototype function:

```
var myCar = new Car("Honda", "Civic", 2004, "Red");

myCar.describeCar();
```

##Prototypal Inheritance
- So far we have seen an example of a single-level prototype chain.
- In the wild you will likely see multi-level chains that inherit properties from other "classes."
- Inheritance is usually done in JavaScript via a two-step process:
	1. Set the prototype of the subclass (the class that will get methods and properties from it's parent, which is also known as the superclass) to a new instance of the superclass (also known as parent class).
	2. Set the constructor of the subclass equal to it's constructor function (which was overwritten when the prototype was set to the superclass). For more info on why this is necessary refer to [this](http://stackoverflow.com/questions/8453887/why-is-it-necessary-to-set-the-prototype-constructor) post.
- Let's take an example of a student inheriting from a person class:

```
function Person(name) {
	this.name = name;
}

Person.prototype.greet = function() {
	return "Hello, my name is: " + this.name;
}

function Student(name, course) {
	this.name = name;
	this.course = course;
}

Student.prototype = new Person;
Student.prototype.constructor = Student;
```

##.hasOwnProperty()
- This is a methods for checking if a property is available on an object.
- The syntax must be written in quotes.
- Let's take a look at an example:

```
var cake = {
	food: "cake"
}

cake.hasOwnProperty("food"); // returns true
```

- Let's do a slightly more complex example involving inheritance:

```
function Person(name) {
	this.name = name;
}

Person.prototype.greet = function() {
	return "Hello, my name is " + this.name;
};

function Student(name, course) {
	this.name = name;
	this.course = course;
};

Student.prototype = new Person
Student.prototype.constructor = Student;

p = new Person("bob");
s = new Student("tom");

p.hasOwnProperty("name"); //returns true
s.hasOwnProperty("course"); //returns true
s.hasOwnProperty("name"); //returns true
```

##instanceof
- This is a common method that allows us to check if a specific object is an instance of a class.

Basic example:

```
var color = "Green";

color instanceof String; //returns true
```

Example with inheritance:

```
function Person(name) {
	this.name = name;
}

Person.prototype.greet = function() {
	return "Hello, my name is " + this.name;
};

function Student(name, course) {
	this.name = name;
	this.course = course;
};

Student.prototype = new Person
Student.prototype.constructor = Student;

p = new Person("bob")
s = new Student("tom")

s instanceof Person //returns true
p instanceof Student //returns false
Person instanceof Object //returns true
```

##In-Class Lab: A Basic "ORM" for AJAX
- For this exercise we will be using the wine API located here: `http://daretodiscover.herokuapp.com/wines`.
- We will be building an app using constructors and prototypes that will perform the full CRUD operations on wine objects using jQuery AJAX.
- Here are the endpoints for reference:
	- `GET /wines` -> Get all wines
	- `POST /wines` -> Create a new wine
	- `PUT /wines/:id` -> Update a wine
	- `DELETE /wines/:id` -> Delete a wine
- Steps:
	1. Create a constructor function that will take and set parameters for each of the listed attributes.
	2. Create a `save` prototype function that will take a wine object and create a POST request to the proper URL.
	3. Create two prototype functions - `findAll` and `find` that will perform `GET` requests to the proper URLs.
	4. Create an `update` prototype function that will take a wine object and create a PUT request to the proper URL.
	5. Create a `delete` prototype function that will perform a DELETE request to the proper URL. 