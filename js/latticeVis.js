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
    let divLatticeVis = d3.select("#lattice-vis");
    $("#lattice-vis").height($("#background-vis").height());
    self.svgWidth = window.innerWidth*.6;
    self.svgHeight = $("#background-vis").height();

    //Creates svg element within the div
    self.svg = divLatticeVis.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight)
        .attr("id", "latticeSVG");

    self.svg.append("rect").attr("x", 0).attr("y", 0).attr("width", 100).attr("height", 100).style("fill", "blue");

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