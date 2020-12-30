/**
 * Constructor for the DietVis
 */
function DietVis(){
    let self = this;

    self.init();
};

/**
 * Initializes the svg elements required for diet vis
 */
DietVis.prototype.init = function(){
    let self = this;
    self.margin = {top: 10, right: 10, bottom: 10, left: 10};

    //Gets access to the div element created for this chart from HTML
    let divDietVis = d3.select("#diet-vis");
    // divDietVis.attr("height", 3*window.innerHeight);
    self.svgBounds = divDietVis.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = window.innerHeight - self.margin.bottom - self.margin.top;

    //Creates svg element within the div
    self.svg = divDietVis.append("svg")
        .attr("width",self.svgWidth + self.margin.left + self.margin.right)
        .attr("height",self.svgHeight + self.margin.bottom + self.margin.top)
        .attr("id", "dietSVG");

    self.pages = {
        INFO_1: 0,
        INFO_2: 1,
        INFO_3: 2,
        INFO_4: 3
    };

    const mealScale = function(d) {
        if(d < 10) {
            return "dinner";
        }
        else if(d >= 10 && d < 18) {
            return "lunch";
        }    
        else{
            return "breakfast";
        }
    }

    const initialData = d3.range(26).map(function(i){
        return {"index": i, "meal": mealScale(i)};
    });

    self.nodes = initialData;

    self.node = self.svg.selectAll(".node");
    self.update(self.pages.INFO_1);

    $("#info-2").waypoint(function(direction) {
        if(direction == "down") {
            self.update(self.pages.INFO_2);
        }
        else {
            self.update(self.pages.INFO_1);
        } 
    }, {offset: 3*window.innerHeight/4});

    $("#info-3").waypoint(function(direction) {
        if(direction == "down") {
            self.update(self.pages.INFO_3);
        }
        else {
            self.update(self.pages.INFO_2);
        } 
    }, {offset: 3*window.innerHeight/4});

    $("#info-4").waypoint(function(direction) {
        if(direction == "down") {
            self.update(self.pages.INFO_4);
        }
        else {
            self.update(self.pages.INFO_3);
        } 
    }, {offset: 3*window.innerHeight/4});

};

/**
 * Data wrangling
    * @param data 
 */
DietVis.prototype.wrangleData = function(data){
    let self = this;

}

/**
 * Updates the month data
 * @param pageId -- ID of current page
 */
DietVis.prototype.update = function(pageId) {
    let self = this;

    const mealScale = function(d) {
        if(d < 10) {
            return "dinner";
        }
        else if(d >= 10 && d < 18) {
            return "lunch";
        }    
        else{
            return "breakfast";
        }
    }

    const initialData = d3.range(26).map(function(i){
        return {"index": i, "meal": mealScale(i)};
    });

    let positionScale = d3.scaleOrdinal()
        .domain(["breakfast", "lunch", "dinner"])
        .range([(self.svgWidth/2)-250, (self.svgWidth/2), (self.svgWidth/2)+250]);

    if (pageId==self.pages.INFO_1) {
        self.svg.selectAll(".extra").remove();

        self.nodes = initialData;

        self.svg.append("circle")
            .attr("fill", "#acabd6")
            .attr("r", 20)
            .attr("cx", 100)
            .attr("cy", 100)
            .attr("class", "extra");
        self.svg.append("text")
            .attr("x", 130)
            .attr("y", 105)
            .text("= unique food")
            .attr("class", "extra");

        self.simulation = d3.forceSimulation()
            .force("center", d3.forceCenter(self.svgWidth/2, self.svgHeight/2))
            .force("x", d3.forceX().strength(5).x(self.svgWidth/2))
            .force("y", d3.forceY().strength(5).y(self.svgHeight/2))
            .force("charge", d3.forceManyBody().strength(5))
            .force("collide", d3.forceCollide().strength(0.5).radius(24).iterations(1))
            .on("tick", tick);

        restart();
    }
    else if (pageId==self.pages.INFO_2) {
        self.svg.selectAll(".extra").remove();
        const labels = ["Breakfast", "Lunch", "Dinner"];
        self.svg.selectAll(".extra").data(labels)
            .enter()
            .append("text")
            .style("text-anchor", "middle")
            .attr("x", function(d) {
                return positionScale(d.toLowerCase());
            })
            .attr("y", 220)
            .text(function(d) {
                return d;
            })
            .attr("class", "extra");

        self.nodes = initialData;

        // Code modified from https://bl.ocks.org/bumbeishvili/6793014c7f0f7838c5a0a8c99d5e818c
        self.simulation = d3.forceSimulation()
            .force("center", d3.forceCenter(self.svgWidth/2, self.svgHeight/2))
            .force("x", d3.forceX().strength(15).x(function(d) {
                return positionScale(d.meal);
            }))
            .force("y", d3.forceY().strength(5).y(self.svgHeight/2))
            .force("charge", d3.forceManyBody().strength(5))
            .force("collide", d3.forceCollide().strength(0.3).radius(24).iterations(1))
            .on("tick", tick);

        restart();
    }
    else if (pageId==self.pages.INFO_3) {
        self.svg.selectAll(".extra").remove();
        const labels = ["Breakfast", "Lunch", "Dinner"];
        self.svg.selectAll(".extra").data(labels)
            .enter()
            .append("text")
            .style("text-anchor", "middle")
            .attr("x", function(d) {
                return positionScale(d.toLowerCase());
            })
            .attr("y", 220)
            .text(function(d) {
                return d;
            })
            .attr("class", "extra");

        self.nodes = initialData.filter(function(d) {
            let removedNums = [0, 1, 10, 11, 12, 13, 18, 19, 20, 21];
            return !removedNums.includes(d.index);
        });

        self.simulation = d3.forceSimulation()
            .force("center", d3.forceCenter(self.svgWidth/2, self.svgHeight/2))
            .force("x", d3.forceX().strength(15).x(function(d) {
                return positionScale(d.meal);
            }))
            .force("y", d3.forceY().strength(5).y(self.svgHeight/2))
            .force("charge", d3.forceManyBody().strength(5))
            .force("collide", d3.forceCollide().strength(0.3).radius(24).iterations(1))
            .on("tick", tick);

        restart();
    }
    else {
        self.svg.selectAll(".extra").remove();

        self.simulation = d3.forceSimulation()
            .force("center", d3.forceCenter(self.svgWidth/2, self.svgHeight/2))
            .force("x", d3.forceX().strength(15).x(self.svgWidth/2))
            .force("y", d3.forceY().strength(15).y(self.svgHeight/2))
            .force("charge", d3.forceManyBody().strength(5))
            .force("collide", d3.forceCollide().strength(0.5).radius(24).iterations(1))
            .on("tick", tick);

        restart();
    }

    function tick() {
        self.node.attr("cx", function(d) { return d.x; })
                 .attr("cy", function(d) { return d.y; });
    }

    // Code modified from https://bl.ocks.org/bumbeishvili/6793014c7f0f7838c5a0a8c99d5e818c
    function restart() {
        self.node = self.node.data(self.nodes);
        self.node.exit().remove();
        self.node
            .attr("fill", function(d) {
                if(pageId!=self.pages.INFO_1) {
                    if(d.meal=="breakfast") {
                        return "beige";
                    }
                    else if(d.meal=="lunch") {
                        return "lightblue";
                    }
                    return "darkgreen";                    
                }
                return "#acabd6";
            });
            
        self.node = self.node.enter()
            .append("circle")
            .attr("fill", function(d) {
                if(pageId!=self.pages.INFO_1) {
                    if(d.meal=="breakfast") {
                        return "beige";
                    }
                    else if(d.meal=="lunch") {
                        return "lightblue";
                    }
                    return "darkgreen";                    
                }
                return "#acabd6";
            })
            .attr("r", 20)
            .merge(self.node);

        self.simulation.nodes(self.nodes);
        self.simulation.alpha(0.005).restart();
      };
}