angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicModal,$ionicPopup, $timeout,$state,Chats) {

$scope.loginData = {};


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/tab-dash.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
//    console.log('Doing login', $scope.loginData);
    if($scope.loginData.usuario == null || $scope.loginData.usuario =="")
    {
          $scope.showAlert("Ingrese su usuario");
    }
      else
      {
        var user = $scope.loginData.usuario;
        $scope.usuario = user.trim();

        $scope.showAlert("A jugar " + $scope.usuario);
        var usuario = { "name": $scope.usuario};
        Chats.user = usuario;
        $state.go("tab.movimiento");
      }
    };
  
     $scope.showAlert = function(resultado) {
      var alertPopup = $ionicPopup.alert({
         title: resultado
      });
      alertPopup.then(function(res) {
         // Custom functionality....
      });
   };
})



.controller('movimientoCtrl', function ($scope, $stateParams,$cordovaDeviceMotion,$cordovaMedia,$cordovaFile,$timeout){

var usuario = "Leandro";

 $cordovaFile.checkDir(cordova.file.externalApplicationStorageDirectory, usuario)
      .then(function (success) {
        // success
          console.log("YA EXISTE LA CARPETA DEL USUARIO");
      }, function (error) {
        alert(error);
        // error
          console.log("No se encuentra la carpeta del usuario. Creando...");
          $cordovaFile.createDir(cordova.file.externalApplicationStorageDirectory, usuario, true)
            .then(function (success) {
              // success
                console.log("CARPETA CREADA CON EXITO");
            }, function (error) {
              alert(error);
              // error
                console.info("ERROR CREANDO CARPETA" , error);
            });
      });

    var parSrc = cordova.file.externalApplicationStorageDirectory+usuario+"/parado.wav";
    var babSrc = cordova.file.externalApplicationStorageDirectory+usuario+"/bocaarriba.wav";
    var barSrc = cordova.file.externalApplicationStorageDirectory+usuario+"/bocaabajo.wav";
    var derSrc = cordova.file.externalApplicationStorageDirectory+usuario+"/derecha.wav";
    var izqSrc = cordova.file.externalApplicationStorageDirectory+usuario+"/izquierda.wav";
  
    var parMedia = $cordovaMedia.newMedia(parSrc);
    var babMedia = $cordovaMedia.newMedia(babSrc);
    var barMedia = $cordovaMedia.newMedia(barSrc);    
    var derMedia = $cordovaMedia.newMedia(derSrc);
    var izqMedia = $cordovaMedia.newMedia(izqSrc);


 $scope.GrabarSonido = function(id){
      switch(id) {
          case "parado":
              //$timeout(function () {
                  parMedia.startRecord();
                  $timeout(function(){
                      parMedia.stopRecord();
                  },1500);
              //}, 500);
              break;
          case "bocaarriba":
             //$timeout(function () {
                  barMedia.startRecord();
                  $timeout(function(){
                      barMedia.stopRecord();
                  },1500);
              //}, 500);
              break;
          case "bocaabajo":
             // $timeout(function () {
                  babMedia.startRecord();
                  $timeout(function(){
                      babMedia.stopRecord();
                  },1500);
              //}, 500);

              break;
          case "derecha":
              //$timeout(function () {
                  derMedia.startRecord();
                  $timeout(function(){
                      derMedia.stopRecord();
                  },1500);
             // }, 500);
              break;
          case "izquierda":
              //$timeout(function () {
                  izqMedia.startRecord();
                  $timeout(function(){
                      izqMedia.stopRecord();
                  },1500);
              //}, 500);
              break;
      }
    }


       $scope.startWatching = function() {
        // Device motion configuration
          var options = { frequency: 10 };

        $scope.watch = $cordovaDeviceMotion.watchAcceleration(options);
     
        // Device motion initilaization
        $scope.watch.then(null, function(error) {
            console.log('Error: ' + error);
        },function(result) {
     
            // Set current data  
            // $scope.measurements.x = result.x;
            // $scope.measurements.y = result.y;
            // $scope.measurements.z = result.z;

            var X = result.x;
            var Y = result.y;
            var Z = result.z;
            var timeStamp = result.timestamp;



            if(result.z > 5)
            {
              //BOCA ARRIBA (DEPENDE DE OTRA INCLINACION)              
            }else if(result.z < -5){
              //BOCA ABAJO
              

                $cordovaFile.checkFile(cordova.file.externalApplicationStorageDirectory, "files/"+UsuarioMovimiento.getName()+"/babSound.wav")
                  .then(function (success) {
                    console.info("SUCCESS CHECK FILE",success);
                    babMedia.play();
                  }, function (error) {
                    console.info("ERROR CHECK FILE",error);
                  });                                          
            }
            else{
              //PARADO              
                $cordovaFile.checkFile(cordova.file.externalApplicationStorageDirectory, "files/"+UsuarioMovimiento.getName()+"/parSound.wav")
                  .then(function (success) {
                    console.info("SUCCESS CHECK FILE",success);
                    parMedia.play();
                  }, function (error) {
                    console.info("ERROR CHECK FILE",error);
                  });
              }              

            if(result.x > 4)
            {
              if(result.z == 1)
              {                                
                  $cordovaFile.checkFile(cordova.file.externalApplicationStorageDirectory, "files/"+UsuarioMovimiento.getName()+"/izqSound.wav")
                  .then(function (success) {
                    console.info("SUCCESS CHECK FILE",success);
                    izqMedia.play();
                  }, function (error) {
                    console.info("ERROR CHECK FILE",error);
                  });
                  
              }              
            }
            else 
            if(result.x < -4)
            {
              if(result.z == 1)
              {
                  $cordovaFile.checkFile(cordova.file.externalApplicationStorageDirectory, "files/"+UsuarioMovimiento.getName()+"/derSound.wav")
                  .then(function (success) {
                    console.info("SUCCESS CHECK FILE",success);
                    derMedia.play();
                  }, function (error) {
                    console.info("ERROR CHECK FILE",error);
                  });                          
              }
            }
            else
            {
              if(result.z == 1)
              {                
                  $cordovaFile.checkFile(cordova.file.externalApplicationStorageDirectory, "files/"+UsuarioMovimiento.getName()+"/barSound.wav")
                  .then(function (success) {
                    console.info("SUCCESS CHECK FILE",success);
                    barMedia.play();
                  }, function (error) {
                    console.info("ERROR CHECK FILE",error);
                  });
                
              }              
            }
/*
            if(result.y > 4)
            {
              $scope.measurements.y = 1;
            }else if(result.y < -4)
            {
              $scope.measurements.y = -1;
            }
            else
            {
              $scope.measurements.y = 0;
            }
            //PARADO                 */
        });     
    };      

})


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.miFoto = 'img/miFoto.png';

});
