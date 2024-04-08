// GRID.JS - Recursive subdivision generative art program
// Generates grid-based artwork using squares and circles
// Each piece uses a base cell, divided into rows and columns
// Each cell has a chance to contain a circle or be empty
// Other effects like offset and rotation available with slider input
// Once a layer has been drawn, it subdivides it and fills the next layer within it

// Variables to hold the diagram and the canvas
let diagram;

let MIN_WIDTH;

let c;

// Some color palettes stored as arrays
const PALETTES = [

    // Pastel
    ["#FBF8CC","#FDE4CF","#FFCFD2","#F1C0E8","#CFBAF0","#A3C4F3","#90DBF4","#8EECF5","#98F5E1","#B9FBC0",],
    // Synthwave
    ["#FFBE0B","#FB5607","#FF006E","#8338EC","#3A86FF",],
    // Coffee
    ["#EDE0D4","#E6CCB2","#DDB892","#B08968","#7F5539",],
    // Red n Blue
    ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"],
    // Forest
    ["#e9f5db", "#cfe1b9", "#b5c99a", "#97a97c", "#87986a", "#718355"],
    // Heatwave
    ["#ff7b00", "#ff8800", "#ff9500", "#ffa200", "#ffaa00", "#ffb700", "#ffc300", "#ffd000", "#ffdd00", "#ffea00"],
    // Reptile
    ["#05668d","#028090","#00a896","#02c39a","#f0f3bd"],
    // Purp
    ["#240046","#3c096c","#5a189a","#7b2cbf","#9d4edd","#c77dff","#e0aaff"],

    
];

// Sets up the canvas and calls for a new diagram to be drawn
function setup(){

    c = createCanvas(2000,750);
    c.parent("canvasContainer");

    newDiagram();

}

// Generates a new diagram
function newDiagram(){

    // Pick a new color palette from the collection
    let palette = random(PALETTES);
    background(random(palette));

    // Cell object has a newCell function which recursively populates the diagram, so make a new cell adn call it
    diagram = new Cell(2,2,width,height,palette);
    diagram.newCell();

}

// Function which saves the canvas
function saveDiagram(){
    saveCanvas("Grid","png");
}

// Cell "class" - A cell has R and C for how many rows and cols it contains and a W and H for its width and height
// Cell has a function which recursively subdivides and populates the cells with smaller cells
function Cell(rows,cols,width,height,pal){

    // rows, cols, width, height of the cell
    this.r = rows;
    this.c = cols;

    this.w = width;
    this.h = height;

    this.palette = pal;

    // This function will populate the current cell and will recursively fill it with child cells and so on
    this.newCell = function(){

        // Firstly, check if the wdith of the cell has reached the defined minimum, at which point we would stop
        if(this.w > 8){

            push();
            rectMode(CORNER);
            fill(random(this.palette));

            // stroke(255);
            // strokeWeight(1);
            
            // Draw the BG of the currnt cell
            rect(0,0,this.w,this.h,0);
            pop();

            // Random chance based on slider that this cell also contains a circle
            let r = random();
            if(r < 0.5){
                push();
                ellipseMode(CORNER);
                fill(random(this.palette));

                // stroke(255);
                // strokeWeight(1);

                // Draw the circle
                ellipse(0,0,this.w,this.h);
                pop();
            }
            
            // Now that the current cell is done, we must visit every cell within
            // The number of cells is defined as rows x cols
            for(let i = 0 ; i < this.r ; i ++){
                for(let j = 0 ; j < this.c ; j ++){
    
                    // Get the canvas coords of the child cell
                    let l = i*(this.h/this.r);
                    let k = j*(this.w/this.c);
    
                    push();
                    // Translate to it
                    translate(l,k);
    
                    // Random chance based on slider that this child cell will simply be empty
                    let r = random();
                    if(r < 0.75){
    
                        // If there's a child cell, define a new cell and recur this function
                        let newCell = new Cell(this.r,this.c,this.h/this.r,this.w/this.c, this.palette);
                        newCell.newCell();
    
                    }
    
                    pop();
    
                }
            }

        }
        
    }

};
