```javascript
var mySelf = function() {
    return Object.create({
        name: "hxAri",
        motto: "Everybody Needs A Programmer.",
        about: "Just a Programmer from Indonesian.",
        skill: [ "PHP", "Python", "Javascript" ]
    });
};

console.log( mySelf().name );
console.log( mySelf().about );

for( let skill in mySelf().skill ) {
    console.log( `Coding ${mySelf().skill[skill]}` );
}
```
