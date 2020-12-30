/**
 * Constructor for the LatticeVis
 */
function LatticeVis(){
    let self = this;

    self.init();
};

/**
 * Initializes the svg elements required for diet vis
 */
LatticeVis.prototype.init = function(){
    let self = this;
    self.margin = {top: 0, right: 10, bottom: 0, left: 0};

    //Gets access to the div element created for this chart from HTML
    $("#background-vis").css("height", $("#background").height()-$("#background-intro").height()-$("#background-stats").height()-$("#background h4").height()-200);
    let divLatticeVis = d3.select("#lattice-vis");
    $("#lattice-vis").height($("#background-vis").height());
    self.svgWidth = window.innerWidth*.7;
    self.svgHeight = $("#background-vis").height();

    //Creates svg element within the div
    self.svg = divLatticeVis.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight)
        .attr("id", "latticeSVG");

    const radius = Math.min(self.svgHeight/6, (self.svgWidth*0.5)/8)/2;

    const xScale = d3.scaleLinear()
        .domain([0, 6])
        .range([radius, (self.svgWidth*0.5)-radius]);

    const yScale = d3.scaleLinear()
        .domain([0, 4])
        .range([radius, self.svgHeight-radius]);

    const testData = d3.range(35).map(function(i) {
        if (i<9) {
            return {index: i, eater: "picky"};
        }
        if(i==9) {
            return {index: i, eater: "arfid"};
        }
        return {index: i, eater: "normal"};
    });

    self.svg.selectAll("circle").data(testData)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xScale(d.index%7);
        })
        .attr("cy", function(d) {
            return yScale(Math.floor(d.index/7));
        })
        .attr("r", radius)
        .attr("class", function(d) {
            return "latticecircles " + d.eater;
        });

    self.svg.append("text")
        .attr("x", (self.svgWidth*0.55))
        .attr("y", yScale(0))
        .attr("class", "picky")
        .style("fill", "white")
        .style("font-size", 30)
        .text("9 people refusing a salad");

    self.svg.append("text")
        .attr("x", (self.svgWidth*0.55))
        .attr("y", yScale(1))
        .attr("class", "arfid")
        .style("fill", "white")
        .style("font-size", 30)
        .text("1 person only eating bread");


    $("#background").waypoint(function(direction) {
        if(direction == "down") {
            $("#stats1").delay(500).animate({opacity: 1}, 1000);
            $("#stats2").delay(2500).animate({opacity: 1}, 1000);
            $("#background h4").delay(5000).animate({opacity: 1}, 1000);
            $(".latticecircles").delay(5000).animate({opacity: 1}, 1000);
            self.svg.selectAll(".picky").transition().delay(7000).duration(1000).style("fill", "#ffa85c");
            self.svg.selectAll(".arfid").transition().delay(9000).duration(1000).style("fill", "#d92721");
            $("#popup").delay(11000).animate({opacity: 1}, 1000);
        }
    }, {offset: window.innerHeight/4});
};

/**
 * Data wrangling
    * @param data 
 */
LatticeVis.prototype.wrangleData = function(data){
    let self = this;

}

/**
 * Updates the month data
 * @param pageId -- ID of current page
 */
LatticeVis.prototype.update = function(pageId) {
    let self = this;

}