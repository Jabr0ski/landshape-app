import continentQueues from "./statQueues";

function start(){
    if (localStorage.getItem('OAqueue')){
            continentQueues.OAqueue = localStorage.getItem('OAqueue').split(',').map(Number);
    } else {
        // OAqueue.continent = 'OA'
        localStorage.setItem('OAqueue', continentQueues.OAqueue)
    }
    
    if (localStorage.getItem('AFqueue')){
        // localStorage.removeItem("AFqueue")
        continentQueues.AFqueue = localStorage.getItem('AFqueue').split(',').map(Number);
            // AFqueue.continent = 'AF'
    } else {
            // AFqueue.continent = 'AF'
            localStorage.setItem('AFqueue', continentQueues.AFqueue)
    }
    
    if (localStorage.getItem('ANqueue')){
        // localStorage.removeItem("ANqueue")
        continentQueues.ANqueue = localStorage.getItem('ANqueue').split(',').map(Number);
            // ANqueue.continent = 'AN'
    } else {
            // ANqueue.continent = 'AN'
            localStorage.setItem('ANqueue', continentQueues.ANqueue)
    }
    
    if (localStorage.getItem('ASqueue')){
        // localStorage.removeItem("ASqueue")
        continentQueues.ASqueue = localStorage.getItem('ASqueue').split(',').map(Number);
            // ASqueue.continent = 'AS'
    } else {
            // ASqueue.continent = 'AS'
            localStorage.setItem('ASqueue', continentQueues.ASqueue)
    }
    
    if (localStorage.getItem('EUqueue')){
        // localStorage.removeItem("EUqueue")
        continentQueues.EUqueue = localStorage.getItem('EUqueue').split(',').map(Number);
            // EUqueue.continent = 'EU'
    } else {
            // EUqueue.continent = 'EU'
            localStorage.setItem('EUqueue', continentQueues.EUqueue)
    }
    
    if (localStorage.getItem('NAqueue')){
        // localStorage.removeItem("NAqueue")
        continentQueues.NAqueue = localStorage.getItem('NAqueue').split(',').map(Number);
            // NAqueue.continent = 'NA'
    } else {
            // NAqueue.continent = 'NA'
            localStorage.setItem('NAqueue', continentQueues.NAqueue)
    }
    
    if (localStorage.getItem('OCqueue')){
        // localStorage.removeItem("OCqueue")
        continentQueues.OCqueue = localStorage.getItem('OCqueue').split(',').map(Number);
            // OCqueue.continent = 'OC'
    } else {
            // OCqueue.continent = 'OC'
            localStorage.setItem('OCqueue', continentQueues.OCqueue)
    }
    
    if (localStorage.getItem('SAqueue')){
        // localStorage.removeItem("SAqueue")
        continentQueues.SAqueue = localStorage.getItem('SAqueue').split(',').map(Number);
            // SAqueue.continent = 'SA'
    } else {
            // SAqueue.continent = 'SA'
            localStorage.setItem('SAqueue', continentQueues.SAqueue)
    }
}

export default start;