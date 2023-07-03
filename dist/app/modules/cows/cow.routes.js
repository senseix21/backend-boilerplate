"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cow_validation_1 = require("./cow.validation");
const cow_controller_1 = require("./cow.controller");
const authenticate_1 = __importDefault(require("../../middlewares/authenticate"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-Cow', (0, authenticate_1.default)(user_1.ENUM_USER_ROLE.SELLER), (0, validateRequest_1.default)(cow_validation_1.CowValidation.createCowZodSchema), cow_controller_1.CowController.createCow);
router.get('/', (0, authenticate_1.default)(user_1.ENUM_USER_ROLE.SELLER, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.ADMIN), cow_controller_1.CowController.getAllCows);
router.get('/:id', (0, authenticate_1.default)(user_1.ENUM_USER_ROLE.SELLER, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.ADMIN), cow_controller_1.CowController.getCowById);
router.patch('/:id', (0, authenticate_1.default)(user_1.ENUM_USER_ROLE.SELLER), (0, validateRequest_1.default)(cow_validation_1.CowValidation.updateCowZodSchema), cow_controller_1.CowController.updateCowByID);
router.delete('/:id', (0, authenticate_1.default)(user_1.ENUM_USER_ROLE.SELLER), cow_controller_1.CowController.deleteCowByID);
exports.CowRoutes = router;
