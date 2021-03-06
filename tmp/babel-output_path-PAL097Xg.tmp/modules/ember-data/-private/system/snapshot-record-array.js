
export default SnapshotRecordArray;

/**
  @module ember-data
*/

import isEnabled from 'ember-data/-private/features';

/**
  @class SnapshotRecordArray
  @namespace DS
  @private
  @constructor
  @param {Array} snapshots An array of snapshots
  @param {Object} meta
*/
function SnapshotRecordArray(recordArray, meta) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  /**
    An array of snapshots
    @private
    @property _snapshots
    @type {Array}
  */
  this._snapshots = null;
  /**
    An array of records
    @private
    @property _recordArray
    @type {Array}
  */
  this._recordArray = recordArray;
  /**
    Number of records in the array
    @property length
    @type {Number}
  */
  this.length = recordArray.get('length');
  /**
    The type of the underlying records for the snapshots in the array, as a DS.Model
    @property type
    @type {DS.Model}
  */
  this.type = recordArray.get('type');
  /**
    Meta object
    @property meta
    @type {Object}
  */
  this.meta = meta;
  /**
    A hash of adapter options
    @property adapterOptions
    @type {Object}
  */
  this.adapterOptions = options.adapterOptions;

  this.include = options.include;
}

/**
  Get snapshots of the underlying record array
  @method snapshots
  @return {Array} Array of snapshots
*/
SnapshotRecordArray.prototype.snapshots = function () {
  if (this._snapshots) {
    return this._snapshots;
  }
  var recordArray = this._recordArray;
  this._snapshots = recordArray.invoke('createSnapshot');

  return this._snapshots;
};