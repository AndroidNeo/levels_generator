
var L = 40;
var VShift = 190;
var HShift = 15;


function generateNewMap() {
    $('#levels_map').empty();

    var sizeN = $('#size_n').val();
    var sizeM = $('#size_m').val();

    //alert(sizeM);

    for (var i = 0; i < sizeN; i++) {
        for (var j = 0; j < sizeM; j++) {
            var cellID = getCellID(i, j);

            var style="width:" + L + "px; height:" + L + "px; top:" + (i * L + VShift) + "px; left:" + (j * L + HShift) + "px;";

            var newCell = "<div id='" + cellID + "' class='cell_free' style='" + style + "' cell_number='' cell_type='free'>  </div>";
            $('#levels_map').append(newCell);

        }
    }

    $('#levels_map').on('click', function ($event) {

        var targetElement = $event.originalEvent.target;
        var targetID = targetElement.id;

        var isCell = (targetID.indexOf('cell_') == 0);
        var isTile = (targetID.indexOf('tile_') == 0);

        if (isCell) {
            setCurrentIndexes(targetID);
            setSelectedCell(targetID);
            setCurrentCellNumber(targetID);
            changeCellTypeByClick(targetID);
        } else if (isTile) {
            setCurrentIndexes(targetID);
            setSelectedTile(targetID);
            setCurrentTileNumber(targetID);
        }

    });


    var targetID = 'cell_0_0';

    setCurrentIndexes(targetID);
    setSelectedCell(targetID);

}

function setCurrentIndexes(targetID) {

    var p1 = targetID.indexOf('_');
    var p2 = targetID.indexOf('_', p1 + 1);

    var current_i = targetID.substr(p1 + 1, p2 - p1 - 1);
    var current_j = targetID.substr(p2 + 1, targetID.length - (p2 + 1));

    $('#current_i').val(current_i);
    $('#current_j').val(current_j);

}

function setSelectedCell(targetID) {

    $('.cell_selected').toggleClass('cell_selected',false);

    var element = $('#'+targetID);

    element.toggleClass('cell_selected', true);

    $('.tile_selected').toggleClass('tile_selected',false);


}

function setSelectedTile(targetID) {

    $('.tile_selected').toggleClass('tile_selected',false);

    var element = $('#'+targetID);

    element.toggleClass('tile_selected', true);

    $('.cell_selected').toggleClass('cell_selected',false);

}

function setCurrentCellNumber(targetID) {

    var element = $('#'+targetID);

    $('#cell_number').val(element.attr('cell_number'));

    $('#tile_number').val('');

}

function setCurrentTileNumber(targetID) {

    var element = $('#'+targetID);

    $('#tile_number').val(element.attr('tile_number'));

}

function changeCellTypeByClick(targetID) {

    var click_action = $(":radio[name=click_action]").filter(":checked").val();

    if (click_action === "wall") {
        changeCellTypeByWallAction(targetID);
    } else if (click_action === "free") {
        changeCellTypeByFreeAction(targetID);
    // } else if (click_action === "tile") {
    //     var newNumber = getNumberForNewTile();
    //     addTile(newNumber);
    //     setSelectedTile(getCurrentTileID());
    }

}

// function getNumberForNewTile() {
//
//     var result = NaN;
//
//     var elements = $('.tile').map(function(indx, element){
//         return $(element).attr("tile_number");
//     });
//
//     var tile_numbers = elements.get();
//
//     var testNumber = 0;
//     while (true) {
//
//         testNumber++;
//         var testNumberStr = '' + testNumber;
//
//         var index = tile_numbers.indexOf(testNumberStr);
//
//         if (index == -1) {
//             result = testNumber;
//             break;
//         }
//
//     };
//
//     return result;
// }

function changeCellTypeByWallAction(targetID) {

    var element = $('#'+targetID);
    var current_type = element.attr('cell_type');

    if (current_type === "wall") {

        element.attr('cell_type','free');
        element.toggleClass('cell_free',true);
        element.toggleClass('cell_wall',false);

    } else {

        var tileID = getCurrentTileID();
        var tileElement = $('#' + tileID);

        var isTileInPlace = (tileElement.length > 0);

        if (isTileInPlace) {

            alert('Cannot change to wall. The tile in this place');

        } else {

            element.attr('cell_type','wall');
            element.attr('cell_number','');

            element.toggleClass('cell_free',false);
            element.toggleClass('cell_number',false);
            element.toggleClass('cell_wall',true);

            element.empty();

        }

    }

}

function changeCellTypeByFreeAction(targetID) {

    var element = $('#'+targetID);
    var current_type = element.attr('cell_type');

    element.attr('cell_type','free');
    element.toggleClass('cell_free',true);

    element.toggleClass('cell_number',false);
    element.attr('cell_number','');
    element.toggleClass('cell_wall',false);

    element.empty();

}

function changeCellTypeByNumberAction(targetID, newNumber) {

    var element = $('#'+targetID);
    var current_type = element.attr('cell_type');

    element.attr('cell_type','number');
    element.attr('cell_number','' + newNumber);

    element.toggleClass('cell_number',true);
    element.toggleClass('cell_free',false);
    element.toggleClass('cell_wall',false);

    var numberHTML = '<span class="cell_number_inside">' + newNumber + '</span>';
    element.append(numberHTML);

}

function cellNumberChange() {

    var targetID = getCurrentCellID();

    var newNumber = parseInt($('#cell_number').val());

    if (isNumeric(newNumber) && newNumber > 0) {
        if ($('[cell_number="' + newNumber + '"]').length == 0) {

            changeCellTypeByNumberAction(targetID, newNumber);

        } else {
            resetCellNumberInputValue();
            alert('The number "' + newNumber + '" exists');
        }
    } else if (isNumeric(newNumber) && newNumber <= 0) {

        resetCellNumberInputValue();
        alert('Value must be a positive integer');

    } else {
        changeCellTypeByFreeAction(targetID);
    }

}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function resetCellNumberInputValue() {
    $('#cell_number').val('');
}

function tileNumberChange() {

    var targetID = getCurrentTileID();
    var element = $('#' + targetID);
    var isElementExists = (element.length > 0);

    var newNumber = parseInt($('#tile_number').val());

    var newNumberProperty = {'newNumberValid':false, 'newNumberEmpty': false, 'invalidValue': false};
    if (isNumeric(newNumber) && newNumber > 0) {
        newNumberProperty.newNumberValid = true;
    } else if (isNaN(newNumber)) {
        newNumberProperty.newNumberEmpty = true;
    } else {
        newNumberProperty.invalidValue = true;
        alert('Value must be a positive integer');
    }

    if (newNumberProperty.invalidValue == false) {

        if (newNumberProperty.newNumberValid && isElementExists == false) {
            addTile(newNumber);
            setSelectedTile(targetID);
        } else if (newNumberProperty.newNumberValid && isElementExists) {
            changeTileNumber(newNumber);
        } else if (newNumberProperty.newNumberEmpty && isElementExists) {
            removeTile();
            setSelectedCell(getCurrentCellID());
        }

    }

}


function addTile(newNumber) {

    var tileID = getCurrentTileID();

    var i = $('#current_i').val();
    var j = $('#current_j').val();

    var style="width:" + L + "px; height:" + L + "px; top:" + (i * L + VShift) + "px; left:" + (j * L + HShift) + "px;";

    var numberHTML = getTileNumberHTML(newNumber);

    var newTile = "<div id='" + tileID + "' class='tile' style='" + style + "' tile_number='" + newNumber + "'>" + numberHTML + "</div>";
    $('#levels_map').append(newTile);

    var cellID = "cell_" + i + "_" + j;
    var cell_type = $('#' + cellID).attr('cell_type');
    var needChangeCellType = (cell_type === 'wall');
    if (needChangeCellType) {
        changeCellTypeByFreeAction(cellID);
    }

}

function changeTileNumber(newNumber) {

    var tileID = getCurrentTileID();

    var element = $('#' + tileID);
    element.empty();
    element.attr('tile_number', '' + newNumber);
    element.append(getTileNumberHTML(newNumber));

}

function getTileNumberHTML(newNumber) {
    return '<span class="tile_number_inside">' + newNumber + '</span>';
}

function removeTile() {

    var tileID = getCurrentTileID();

    $('#'+tileID).remove();

}

function getCurrentCellID() {

    var i = $('#current_i').val();
    var j = $('#current_j').val();

    return getCellID(i, j);

}

function getCurrentTileID() {

    var i = $('#current_i').val();
    var j = $('#current_j').val();

    return getTileID(i, j);

}

function getCellID(i, j) {
    return 'cell_' + i + '_' + j;
}

function getTileID(i, j) {
    return 'tile_' + i + '_' + j;
}

function showTiles() {
    $('.tile').css('visibility', 'visible');
}

function hideTiles() {
    $('.tile').css('visibility', 'hidden');
}

function exportLevel() {

    var result = '';

    var sizeN = $('#size_n').val();
    var sizeM = $('#size_m').val();

    for (var i = 0; i < sizeN; i++) {
        for (var j = 0; j < sizeM; j++) {

            var cellID = getCellID(i, j);
            var cell_type = $('#' + cellID).attr('cell_type');
            var cell_number = 0;
            if (cell_type === 'number') {
                cell_number = $('#' + cellID).attr('cell_number');
            }

            var currentCellData = getShortCellData(cell_type, cell_number);

            var currentTileData = '';
            var tileID = getTileID(i, j);
            if ($('#' + tileID).length > 0) {
                var tile_number = $('#' + tileID).attr('tile_number');
                currentTileData = '.t' + tile_number;
            }

            result = result + (j === 0 ? '' : ',') + currentCellData + currentTileData;

        }

        result = result + ';';
    }

    console.log(result);
}


function getShortCellData(cell_type, cell_number) {

    var result = '';

    if (cell_type === 'free') {
        result = 'f';
    } else if (cell_type === 'wall') {
        result = 'w';
    } else if (cell_type === 'number') {
        result = 'c' + cell_number;
    }
    return result;

}