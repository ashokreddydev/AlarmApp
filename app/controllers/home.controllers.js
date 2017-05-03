var Alarm = angular.module('Alarm')
Alarm.controller('homecontroller',['$scope','$interval', function($scope,$interval ){
    
    $scope.alarms = [];
  
   var modal = document.getElementById('myModal');

// Get the button that opens the modal

 
    
    $scope.currentTime = { time : new Date() };
    
    $scope.removeAlarm = function(index) 
            {
                $scope.alarms.splice(index, 1);
                 pauseAlarm();
			}
    
    	// Push alarm Time and Date
    $scope.addAlarm = function() 
            {
				$scope.alarms.push({time: $scope.alarmTime});
				$scope.alarmTime = "";
			}
            
            
            
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
                                        
                                        $scope.alarmTime=alarm.time;
                                        modal.style.display = "block";
                                            playAlarm();
                                            return;
                                    }
                                });
                    }, 1000 );
    
    
    
    
    
                	//audio controller refernce variable
			var alarm = document.getElementById("alarm_audio");

			// play alarm sound
			function playAlarm() 
                {
                    alarm.play();
                }

			// stop alarm sound
			function pauseAlarm() 
                    {
                        alarm.pause();
                    }
    
    
    $scope.Continue=function()
    {
        
        modal.style.display = "none";
            pauseAlarm();
        
    }
    

}]);
