var Alarm = angular.module('Alarm')
Alarm.controller('homecontroller',['$scope','$interval','$timeout', function($scope,$interval,$timeout ){
// create  reference array
    $scope.alarms = [];
    // alarm list hide
     $scope.alarmscedule=false;
      
    // Local storage getting Data
     if(localStorage.getItem("alertAlarm")==null)
                {
                    $scope.alarmscedule=false;
                }
        else
                {
                   listOfAlarms=JSON.parse(localStorage.getItem("alertAlarm"));                    
                       if(listOfAlarms.length==0)
                    {
                        $scope.alarmscedule=false; 
                    }
                    else{
                        for (var i=0;i<listOfAlarms.length;i++)
                            {                               
                                var d=new Date(listOfAlarms[i].time)
                                $scope.alarms.push({time: d});
                            }

                        $scope.alarmscedule=true; 
                      }
                }
    
 // Get the button that opens the modal
   var modal = document.getElementById('myModal');


   
    $scope.currentTime = { time : new Date() };
    
    $scope.removeAlarm = function(index) 
            {
                $scope.alarms.splice(index, 1);
                hideAndShow()
                 localStorage.setItem("alertAlarm",  JSON.stringify($scope.alarms));
                
			}
    
    	// Push alarm Time and Date
    $scope.addAlarm = function() 
            {
				$scope.alarms.push({time: $scope.alarmTime});
                localStorage.setItem("alertAlarm",  JSON.stringify($scope.alarms));
				$scope.alarmTime = "";
                $scope.repeate = "";
                $scope.alarmscedule=true; 
			}
    
    // automatic Time Update
      
    $scope.getTime = function()
            {
			
				$scope.currentTime = { time : new Date() };
			
			}
    
  
    
    // interval used to time matched function    
     $interval( function()
                         {
                        $scope.getTime();
                                angular.forEach($scope.alarms, function(alarm, index){
                                if(alarm.time <= $scope.currentTime.time) 
                                    {
                                        
                                        
                                         var now = new Date(alarm.time); 
                                        var str = now.toLocaleTimeString();
                                        var res = str.replace(/\.[0-9]{2,3}/, '');

                                        var now1 = new Date();
                                        var str1 = now1.toLocaleTimeString();
                                        var res1 = str1.replace(/\.[0-9]{2,3}/, '');

    
                                            if(res==res1)
                                            {
                                                $scope.alarmTime=alarm.time;
                                                $scope.indexVale=index;
                                                $scope.arrayTime=alarm;
                                                playAlarm();

                                            }

                                    }
                                });
                    }, 1000 );

            //audio controller refernce variable
			var alarm = document.getElementById("alarm_audio");

			// play alarm sound
			function playAlarm() 
                {   
                    modal.style.display = "block";
                    alarm.play();
                }

			// stop alarm sound
			 function pauseAlarm() 
                    {
                        modal.style.display = "none";
                        alarm.pause();
                       
                    }
                    //tomorrow date activate
                $scope.Continue=function(dateValue,value)
                {
                    $scope.alarms.splice(value, 1);
                    var date = new Date(dateValue.time);
                    date.setDate(date.getDate() + 1);
                    $scope.alarms.push({time: date});
                     localStorage.setItem("alertAlarm",  JSON.stringify($scope.alarms));
                        pauseAlarm();
                }
                
                //delete alarm
               $scope.dismiss=function(value)
               {
                    $scope.alarms.splice(value, 1);
                    pauseAlarm();
                   hideAndShow()
                 localStorage.setItem("alertAlarm",  JSON.stringify($scope.alarms));
                  
               }
               
               //alarm list Table hide and show function
               
               function hideAndShow(){
               if($scope.alarms.length==0)
                    {    
                        $scope.alarmscedule=false; 
                    }
                    else{
                        $scope.alarmscedule=true; 
                    }

               }
}]);
