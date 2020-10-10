# radialBar
Radial Bar jQuery Plugin 

![alt text](https://raw.githubusercontent.com/AhedKabalan/radialBar/master/radial.png)

## Example

[https://www.jqueryscript.net/chart-graph/stacked-donut-radial-bar.html](https://www.jqueryscript.net/chart-graph/stacked-donut-radial-bar.html)

[Online Demo](https://ahedkabalan.github.io/jquery-radialbar/)

```
var data = [
	{primaryColor: "#1991EB", secondaryColor: "#EAF3FB", progress: "60", labelText: "Completed"}, 
	{primaryColor: "#0154C8", secondaryColor: "#ECEDFF", progress: "30", labelText: "Pending"}, 
	{primaryColor: "#9B0696", secondaryColor: "#FBECFF", progress: "20", labelText: "Missed"},
];

$(".radial").radialBar({
	data: data,
	width: "300",
	height: "300",
	strokeWidth: 12,
});
```

## Todo
