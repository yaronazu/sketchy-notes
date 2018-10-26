/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/webview.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/webview.js":
/*!******************************!*\
  !*** ./resources/webview.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Disable the context menu to have a more native feel
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
window.postMessage('loadNotes', 'Called from the webview');
document.getElementById('id-name--1').addEventListener('click', function () {
  window.postMessage('toggleView', 'Called from the webview');
  setToggle();
});

window.removeNoteView = function () {//UI.message('removeNoteView')
  //var elem = document.getElementById("artboard-"+artboardIndex+"-note-"+noteIndex);
  //elem.parentNode.removeChild(elem);
};

window.writeNotes = function (artboardNotes, artboardName) {
  //sketch.UI.message('here');
  var artboardLis = artboardNotes.map(function (notes, i) {
    return notes.map(function (note, j) {
      //return `<li id="artboard-${i}-note-${j}">${note}</li>`
      return "<div class=\"note-block\" id=\"artboard-".concat(i, "-note-").concat(j, "\"><p class=\"note-item\">").concat(note, "</p><div class=\"copy-button\" id=\"copy-").concat(i, "-note-").concat(j, "\">copy</div><div class=\"close-button\" id=\"remove-").concat(i, "-note-").concat(j, "\"></div></div>");
      /* <div class="note-block">
             <p class="note-item">Thing to do now</p>
             <div class="close-button">
             </div>
         </div>*/
    });
  });
  document.getElementById('note-list').innerHTML = artboardLis.map(function (lis) {
    return lis.join('');
  }).join('');
  /*document.getElementById('answer').innerHTML = `<ul>` + 
    artboardLis.map(lis => lis.join('')).join('') 
    + `</ul>`;*/

  artboardLis.forEach(function (lis, i) {
    //document.getElementById('yaron').innerHTML = artboardName[i];
    lis.forEach(function (_, j) {
      var noteEl = document.getElementById("artboard-".concat(i, "-note-").concat(j)).getElementsByClassName("note-item")[0];
      var removeEl = document.getElementById("remove-".concat(i, "-note-").concat(j));
      var copyEl = document.getElementById("copy-".concat(i, "-note-").concat(j));
      noteEl.addEventListener("click", function () {
        //noteEl.innerHTML += "qweqwe"
        // code that call back into sketch
        window.postMessage('navigatePosts', i, j);
      });
      removeEl.addEventListener("click", function (e) {
        // code that call back into sketch
        var elem = document.getElementById("artboard-" + i + "-note-" + j);
        elem.parentNode.removeChild(elem);
        window.postMessage('removePost', i, j);
        var notes = document.getElementsByClassName("note-block");

        if (notes.length == 0) {
          document.getElementById("note-list").className += ' note-empty-state';
        }
        /*var element = document.getElementsByClassName("note-list");
        if(element.classList.contains('note-block')){
         
        }*/

      });
      copyEl.addEventListener("click", function (e) {
        // code that call back into sketch;
        //var elem = document.getElementById("artboard-"+i+"-note-"+j);
        //var child = elem.getElementsByClassName("note-item");
        window.postMessage('copyMessage');
        var targetDiv = document.getElementById("artboard-" + i + "-note-" + j).getElementsByClassName("note-item")[0];
        var el = document.createElement('textarea');
        el.value = targetDiv.innerHTML;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        targetDiv.select();
        document.execCommand("copy");
      });
    });
  });
};

/***/ })

/******/ });
//# sourceMappingURL=webview.js.map