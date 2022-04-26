import TraceLogger from "./trace-logger";

const EventEmitter = require('events');

const ScratchStorage = require('scratch-storage');
const ScratchRender = require('scratch-render');
const ScratchSVGRenderer = require('scratch-svg-renderer');
const AudioEngine = require('scratch-audio');
const VirtualMachine = require('scratch-vm');
const Thread = require('scratch-vm/src/engine/thread');

const ASSET_SERVER = 'https://cdn.assets.scratch.mit.edu';
const PROJECT_SERVER = 'https://cdn.projects.scratch.mit.edu';

/**
 * <canvas></canvas>
 */
class ScratchStage extends EventEmitter {
    constructor (canvas, projectName) {
        super();
        this.canvas = canvas;
        this.vm = ScratchStage.prepareVM(this.canvas);
        this.traceLogger = new TraceLogger(projectName);
        this.project = null;
        this.inputEnabled = false;

        this._onMouseMove = this.onMouseMove.bind(this);
        this._onMouseDown = this.onMouseDown.bind(this);
        this._onMouseUp = this.onMouseUp.bind(this);
        this._onKeyDown = this.onKeyDown.bind(this);
        this._onKeyUp = this.onKeyUp.bind(this);
    }

    async loadProject (project) {
        this.project = project;
        this.vm.clear();
        await this.vm.loadProject(project);
        this.vm.runtime._step();
    }

    start () {
        clearInterval(this.vm.runtime._steppingInterval);
        this.vm.runtime._steppingInterval = null;
        this.vm.start();
    }

    greenFlag () {
        this.start();
        this.vm.greenFlag();
        this.enableInput();
        this.traceLogger.clearTrace();
        this.traceLogger.prepareClasses({Thread}, this.vm);
        this.canvas.focus();
    }

     stop () {
        console.log("trace: ", this.traceLogger.trace);
        clearInterval(this.vm.runtime._steppingInterval);
        this.disableInput();
        this.traceLogger.restoreClasses({Thread});
        this.vm.runtime._steppingInterval = -1;
        this.vm.stopAll();
        this.vm.runtime._step();
    }

    clearTrace () {
        this.traceLogger.clearTrace();
    }

    /**
     * @returns {boolean} .
     */
    isInputEnabled () {
        return this.inputEnabled;
    }

    enableInput () {
        this.canvas.addEventListener('mousemove', this._onMouseMove);
        this.canvas.addEventListener('mousedown', this._onMouseDown);
        this.canvas.addEventListener('mouseup', this._onMouseUp);
        this.canvas.addEventListener('keydown', this._onKeyDown);
        this.canvas.addEventListener('keyup', this._onKeyUp);
        this.inputEnabled = true;
    }

    disableInput () {
        this.canvas.removeEventListener('mousemove', this._onMouseMove);
        this.canvas.removeEventListener('mousedown', this._onMouseDown);
        this.canvas.removeEventListener('mouseup', this._onMouseUp);
        this.canvas.removeEventListener('keydown', this._onKeyDown);
        this.canvas.removeEventListener('keyup', this._onKeyUp);
        this.inputEnabled = false;
    }

    static prepareVM (canvas) {
        const storage = new ScratchStorage();
        const AssetType = storage.AssetType;
        storage.addWebStore([AssetType.Project], ScratchStage.getProjectUrl, ScratchStage.getProjectUrl,
            ScratchStage.getProjectUrl);
        storage.addWebStore([AssetType.ImageVector, AssetType.ImageBitmap, AssetType.Sound], ScratchStage.getAssetUrl,
            ScratchStage.getAssetUrl, ScratchStage.getAssetUrl);

        const renderer = new ScratchRender(canvas);
        const audioEngine = new AudioEngine();
        const SVGAdapter = new ScratchSVGRenderer.SVGRenderer();
        const bitmapAdapter = new ScratchSVGRenderer.BitmapAdapter();

        const vm = new VirtualMachine();
        vm.attachRenderer(renderer);
        vm.attachAudioEngine(audioEngine);
        vm.attachStorage(storage);
        vm.attachV2SVGAdapter(SVGAdapter);
        vm.attachV2BitmapAdapter(bitmapAdapter);

        return vm;
    }

    static getProjectUrl (asset) {
        const assetIdParts = asset.assetId.split('.');
        const assetUrlParts = [PROJECT_SERVER, '/internalapi/project/', assetIdParts[0], '/get/'];
        if (assetIdParts[1]) {
            assetUrlParts.push(assetIdParts[1]);
        }
        return assetUrlParts.join('');
    }

    static getAssetUrl (asset) {
        const assetUrlParts = [
            ASSET_SERVER,
            '/internalapi/asset/',
            asset.assetId,
            '.',
            asset.dataFormat,
            '/get/'
        ];
        return assetUrlParts.join('');
    }

    onMouseMove (e) {
        e.preventDefault();
        this.canvas.focus();
        const rect = this.canvas.getBoundingClientRect();
        const data = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            canvasWidth: rect.width,
            canvasHeight: rect.height
        };
        this.vm.postIOData('mouse', data);
        this.emit('input', {device: 'mouse', ...data});
    }

    onMouseDown (e) {
        e.preventDefault();
        this.canvas.focus();
        const rect = this.canvas.getBoundingClientRect();
        const data = {
            isDown: true,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            canvasWidth: rect.width,
            canvasHeight: rect.height
        };
        this.vm.postIOData('mouse', data);
        this.emit('input', {device: 'mouse', ...data});
    }

    onMouseUp (e) {
        e.preventDefault();
        this.canvas.focus();
        const rect = this.canvas.getBoundingClientRect();
        const data = {
            isDown: false,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            canvasWidth: rect.width,
            canvasHeight: rect.height
        };
        this.vm.postIOData('mouse', data);
        this.emit('input', {device: 'mouse', ...data});
    }

    onKeyDown (e) {
        e.preventDefault();
        const data = {
            keyCode: e.keyCode,
            key: e.key,
            isDown: true
        };
        this.vm.postIOData('keyboard', data);
        this.emit('input', {device: 'keyboard', ...data});
    }

    onKeyUp (e) {
        e.preventDefault();
        const data = {
            key: e.key,
            isDown: false
        };
        this.vm.postIOData('keyboard', data);
        this.emit('input', {device: 'keyboard', ...data});
    }
}

export default ScratchStage;
