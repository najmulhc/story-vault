"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryModule = void 0;
const common_1 = require("@nestjs/common");
const story_controller_1 = require("./story.controller");
const jwt_1 = require("@nestjs/jwt");
const auth_guard_1 = require("../user/guards/auth.guard");
const story_service_1 = require("./story.service");
const typeorm_1 = require("@nestjs/typeorm");
const story_entity_1 = require("./story.entity");
let StoryModule = class StoryModule {
};
exports.StoryModule = StoryModule;
exports.StoryModule = StoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [story_controller_1.StoryController],
        providers: [jwt_1.JwtService, auth_guard_1.AuthGuard, story_service_1.StoryService],
        imports: [
            jwt_1.JwtModule.register({
                secret: '',
            }), typeorm_1.TypeOrmModule.forFeature([story_entity_1.Story])
        ],
    })
], StoryModule);
//# sourceMappingURL=story.module.js.map