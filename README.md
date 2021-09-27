```javascript
var mySelf = function() {
    return Object.create({
        name: "hxAri",
        about: "Just a Programmer from Indonesian.",
        skill: [
            "PHP Developer",
            "Python Developer",
            "Javascript Developer"
        ]
    });
};

console.log( mySelf().name );
console.log( mySelf().about );

for( let skill in mySelf().skill ) {
    console.log( skill );
}
```
