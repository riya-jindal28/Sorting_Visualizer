import React from 'react';
import './SortingVisualizer.css'
import {mergeSortAnimation} from './Algorithms/mergeSort.js';
class SortingVisualizer extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            array : [],
        };
    }

    // When the page renders the first function which should be called.
    componentDidMount() {
        this.resetArray();
    }

    // Function for pushing random numbers in an array.
    resetArray(){
        const array = [];
        for(let i=0;i<94;i++){
            array.push(randomInterval(5,725));
        }
        this.setState({array});
    }
    // merge Sort
    mergeSort(){
        const animations = mergeSortAnimation(this.state.array);            
        for(let i=0;i<animations.length;i++){
            const arrayBars = document.getElementsByClassName("array-bars");
            const isColorChange = i%3!==2;
            if(isColorChange){
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i%3 === 0 ? 'yellow' : 'turquoise';
                setTimeout(()=>{
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i*10);
            }
            else{
                setTimeout(()=>{
                    const [barOneIdx,newheight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newheight}px`;
                },i*10);
            }
        }

    }
    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
          const array = [];
          const length = randomInterval(1, 1000);
          for (let i = 0; i < length; i++) {
            array.push(randomInterval(-1000, 1000));
          }
          const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
          const mergeSortedArray = mergeSortAnimation(array.slice());
          console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }
      }
    render(){
        const {array} = this.state;
        return(
            <>
            <div className="array-container">
            {array.map((value,idx) => (
                <div className="array-bars" key ={idx}
                    style={{height: `${value}px`}}>
                </div>
            ))}
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
            </div>
            <button onClick={() => this.resetArray()}>Generate New Array</button>
            
            {/* <button onClick={heap()}>Heap Sort</button>
            <button onClick={bubble()}>Bubble Sort</button>
            <button onClick={quick()}>Quick Sort</button> */}
            </>
        );
    }
}
function randomInterval(min,max){
    // Math.Floor returns the next greater integer.
    // Math.random returns the random number between 0 and 1.
    return Math.floor(Math.random()*(max-min+1) + min); 
}

function arraysAreEqual(arrayOne, arrayTwo){
    if(arrayOne.length !==arrayTwo.length) return false;
    let n = arrayOne.length; 
    for(let i=0;i<n;i++){
        if(arrayOne[i] !== arrayTwo[i])
        return false;
    }
    return true;
}
export default SortingVisualizer;