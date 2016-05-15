
var L = 40;
var VShift = 220;
var HShift = 15;

var levelNumber = '';

function getInputLevelNumber() {
    return parseInt($('#edit_level').val());
}

function getLevel() {

    var result = '';

    var levelList = [
        'w,w,w,w,w,w,w,w;w,f,f,f,f,f,f,w;w,f,f,f,f,f,f,w;w,f,f,c1.t3,c2.t1,f,f,w;w,f,f,c3.t2,f,f,f,w;w,f,f,f,f,f,f,w;w,f,f,f,f,f,f,w;w,w,w,w,w,w,w,w;'
        ,'w,w,w,w,w,w,w,w;w,f,f,f,f,f,f,w;w,f,f,f,f,f,f,w;w,f,f,c1,c2,f,f,w;w,f,f,c3,f.t4,f.t3,f,w;w,f,f,c4,f.t2,f.t1,f,w;w,f,f,f,f,f,f,w;w,w,w,w,w,w,w,w;'
        ,'w,w,w,w,w,w,w,w;w,f,f,f,f,f,f,w;w,f,f,f,f,f,f,w;w,f,f,c1.t3,c2.t1,f,f,w;w,f,f,c3.t2,c4.t4,f,f,w;w,f,f,f,f,f,f,w;w,f,f,f,f,f,f,w;w,w,w,w,w,w,w,w;'
        ,'w,w,w,w,w,w,w,w;w,w,w,f,f,w,w,w;w,w,f,c1,f.t4,f,w,w;w,f,f,c2,f.t2,f,f,w;w,f,f,c3.t1,c4.t5,f,f,w;w,w,f,f.t3,c5,f,w,w;w,w,w,f,f,w,w,w;w,w,w,w,w,w,w,w;'
        ,'w,w,w,w,w,w,w,w;w,f,f,f,f,f,f,w;w,f,c1,c2,c3,c4,f,w;w,w,w,c5,c6,w,w,w;w,w,w,f.t1,f.t5,w,w,w;w,f,f.t3,f.t4,f.t6,f.t2,f,w;w,f,f,f,f,f,f,w;w,w,w,w,w,w,w,w;'
        ,'w,w,w,w,w,w,w,w;w,w,w,w,w,w,w,w;w,w,f,f,f,f,f,w;w,w,f,w,c1.t5,w,f,w;w,w,f,c2.t2,c3.t1,c4.t4,f,w;w,w,f,w,c5.t3,w,f,w;w,w,f,f,f,f,f,w;w,w,w,w,w,w,w,w;'
        ,'w,w,w,w,w,w,w,w;w,w,f,f,f,f,w,w;w,f,w,f,w,w,f,w;w,f,c1.t5,c2.t2,c3.t6,w,f,w;w,f,w,c4.t1,c5.t4,c6.t3,f,w;w,f,w,w,f,w,f,w;w,w,f,f,f,f,w,w;w,w,w,w,w,w,w,w;'
        ,'w,w,w,w,w,w,w,w;w,f,f,f,f,f,f,w;w,f,f,f,c1.t5,f,f,w;w,f,f,f,c2.t6,c3.t4,f,w;w,w,w,w,c4.t2,w,w,w;w,f,f,c5.t1,c6.t7,f,f,w;w,f,f,f,c7.t3,f,f,w;w,w,w,w,w,w,w,w;'
        ,'w,w,w,w,w,w,w,w;w,w,f,f,f,f,w,w;w,f,w,c1.t3,c2.t1,w,f,w;w,f,w,c3.t2,c4.t5,w,f,w;w,f,w,c5.t6,c6.t4,w,f,w;w,w,f,f,f,f,w,w;w,w,f,f,f,f,w,w;w,w,w,w,w,w,w,w;'
        ,'w,w,w,w,w,w,w,w;w,f,f,f,f,f,f,w;w,f,f,f,w,w,f,w;w,f,c1.t6,c2.t1,c3.t5,w,f,w;w,f,w,c4.t3,c5.t2,f,f,w;w,f,w,w,c6.t4,f,f,w;w,f,f,f,f,f,f,w;w,w,w,w,w,w,w,w;'
    ];

    if (levelList.length >= levelNumber) {
        result = levelList[levelNumber - 1];
    }

    return result;

}

function getLevelDetail() {

    var result = [];

    var level = getLevel();

    var rows = [];
    var p1 = -1;
    while (true) {
        var p2 = level.indexOf(';', p1 + 1);
        if (p2 > 0) {
            var row = level.substr(p1 + 1, p2 - p1 - 1);
            rows.push(row);
            p1 = p2;
        } else {
            break;
        }
    }

    for (var i = 0; i < rows.length; i++) {

        var rowDetail = [];

        var row = rows[i];
        row = row + ',';

        var p1 = -1;
        while (true) {
            var p2 = row.indexOf(',', p1 + 1);
            if (p2 > 0) {
                var cellContent = row.substr(p1 + 1, p2 - p1 - 1);
                rowDetail.push(cellContent);
                p1 = p2;
            } else {
                break;
            }
        }

        result.push(rowDetail);

    }

    return result;

}

function generateNewMap() {

    $('#levels_map').empty();

    levelNumber = getInputLevelNumber();

    if (getLevel() !== '') {
        var levelDetail = getLevelDetail();
        $('#size_n').val(levelDetail.length);
        $('#size_m').val(levelDetail[0].length);
    }

    var sizeN = $('#size_n').val();
    var sizeM = $('#size_m').val();

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

    if (getLevel() !== '') {
        loadLevel();
    }

    var targetID = getCellID(0, 0);

    setCurrentIndexes(targetID);
    setSelectedCell(targetID);

}

function loadLevel() {

    var levelDetail = getLevelDetail();

    console.log(levelDetail);

    for (var i = 0; i < levelDetail.length; i++) {
        for (var j = 0; j < levelDetail[0].length; j++) {

            var cellContent = levelDetail[i][j];
            var cellContentObject = getCellContentObject(cellContent);

            var cellID = getCellID(i, j);
            setCurrentIndexes(cellID);

            if (cellContentObject.w) {
                changeCellTypeByWallAction(cellID);
            } else if (cellContentObject.c > 0) {
                changeCellTypeByNumberAction(cellID, cellContentObject.c);
            }

            var tileID = getTileID(i, j);
            if (cellContentObject.t > 0) {
                addTile(cellContentObject.t);
            }

        }
    }

}

function getCellContentObject(cellContent) {

    var result = {
        'f': false,
        'w': false,
        'c': 0,
        't': 0
    };

    var idx_c = cellContent.indexOf('c');
    var idx_t = cellContent.indexOf('t');

    if (cellContent === 'w') {
        result.w = true;
    } else {

        if (cellContent.indexOf('f') >= 0) {
            result.f = true;
        } else if (idx_c >= 0) {
            var c_str = cellContent.substr(idx_c + 1, 1);
            var c_str_next = cellContent.substr(idx_c + 2, 1);
            result.c = parseInt(c_str) + (isNumeric(c_str_next) ? parseInt(c_str_next) : 0);
        }

        if (idx_t >= 0) {
            var t_str = cellContent.substr(idx_t + 1, 1);
            var t_str_next = cellContent.substr(idx_t + 2, 1);
            result.t = parseInt(t_str) + (isNumeric(t_str_next) ? parseInt(t_str_next) : 0);
        }

    }

    return result;
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
    }

}

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