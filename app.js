let documents = 21
let workers = 4

const documentNumber = document.querySelector('.documentNumber')
const workerNumber = document.querySelector('.workerNumber')
const btn = document.querySelector('button')

documentNumber.textContent = documents
workerNumber.textContent = workers

let documentsInfo = []
let boxes = ''
for(let i =0;i<documents;i++){
    box = `<div class=" border box border-primary m-1">${i}</div>`
    documentsInfo.push({
        id : i,
        dom : box,
        wTime : Math.random()*10000+500
    })
    boxes +=box
}

document.querySelector('.documentplace').innerHTML = boxes

let donePlace = document.querySelector('.donePlace')
let workersArr = []
let workersSpace = ''
let actionMove = ['move1','move2','move3','move4']

for(let i =0;i<workers;i++){
    workersSpace += `<div class="col workspace" id="${i}"><p class="h5 workerName" ">${i+1}</p></div>`
    workersArr.push({
      name : i,
      actionMove : actionMove[i]
    })
}
document.querySelector('.workersSpace').innerHTML = workersSpace

workers = document.querySelectorAll('.workersSpace div')
works = document.querySelectorAll('.box')

const move = function(){
  const queueGenerator = (function *(){
    for (const item of documentsInfo) yield item;
  })()

  const sampleAsyncOp = (job, ms) => new Promise( (res, rej) => setTimeout(()=>res(job), ms) )

  workersArr.forEach( async worker => {
    console.log("Worker", worker.name, "started!")
    for (const job of queueGenerator) { // job is the documentsInfo[i]
      works[job.id].classList.add(worker.actionMove) // moving the box
      works[job.id].textContent = `id:${job.id}\n${Math.floor(job.wTime/100)/10}s` // add the random number into the DOM 
      // logical part of the program
      await sampleAsyncOp(job, job.wTime)
      // at the end we add the boxes into done statement
      works[job.id].remove()
      donePlace.innerHTML += job.dom
    }
  })
}
btn.addEventListener('click',move)
