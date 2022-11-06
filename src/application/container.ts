import {
	createBaseModule,
	createDeckModule,
	EncodingService,
} from "@/core/lib";
import { DeckController } from "./controller/DeckController";
import { DeckUrlController } from "./controller/DeckUrlController";
import { HostEnvironmentConfig } from "@/browser-common/lib";
import { YgoprodeckController } from "./controller/YgoprodeckController";
import { createYgoprodeckModule } from "@/ygoprodeck/lib";

export const environmentConfig = new HostEnvironmentConfig();

const { cardDatabase, ygoprodeckService, resourceService } =
	createYgoprodeckModule(new EncodingService(), environmentConfig);

const {
	cardService,
	sortingService,
	banlistService,
	filterService,
	encodingService,
	cardPredicateService,
} = createBaseModule(cardDatabase);

const {
	deckService,
	deckUriEncodingService,
	deckFileService,
	deckExportService,
	deckRandomizationService,
} = createDeckModule(
	cardService,
	sortingService,
	banlistService,
	filterService,
	encodingService,
	cardDatabase
);

const deckController = new DeckController(cardDatabase, cardService);
const deckUrlController = new DeckUrlController(
	deckService,
	deckUriEncodingService,
	deckFileService
);
const ygoprodeckController = new YgoprodeckController(ygoprodeckService);

export {
	deckRandomizationService,
	banlistService,
	deckService,
	deckUriEncodingService,
	deckFileService,
	filterService,
	sortingService,
	cardPredicateService,
	cardDatabase,
	deckController,
	deckUrlController,
	ygoprodeckController,
	deckExportService,
	resourceService,
	ygoprodeckService,
};
