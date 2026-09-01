/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TrekkingController } from './../controllers/trekking/trekking.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TourController } from './../controllers/tour/tour.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TestimonialController } from './../controllers/testimonial/testimonial.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TeamController } from './../controllers/team/team.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SettingController } from './../controllers/setting/setting.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NotificationController } from './../controllers/notification/notification.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MediaController } from './../controllers/media/media.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { InquiryController } from './../controllers/inquiry/inquiry.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FaqController } from './../controllers/faq/faq.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ExpeditionController } from './../controllers/expedition/expedition.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DashboardController } from './../controllers/dashboard/dashboard.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoryController } from './../controllers/category/category.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BookingController } from './../controllers/booking/booking.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BlogController } from './../controllers/blog/blog.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminAuthController } from './../controllers/admin/auth.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminTrekkingController } from './../controllers/admin/admin-trek.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminTourController } from './../controllers/admin/admin-tour.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminTestimonialController } from './../controllers/admin/admin-testimonial.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminTeamController } from './../controllers/admin/admin-team.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminSettingController } from './../controllers/admin/admin-setting.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminSearchController } from './../controllers/admin/admin-search.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminMediaController } from './../controllers/admin/admin-media.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminInquiryController } from './../controllers/admin/admin-inquiry.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminFaqController } from './../controllers/admin/admin-faq.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminExpeditionController } from './../controllers/admin/admin-expedition.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminCategoryController } from './../controllers/admin/admin-category.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminBookingController } from './../controllers/admin/admin-booking.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminBlogController } from './../controllers/admin/admin-blog.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminBackupController } from './../controllers/admin/admin-backup.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminAuditLogController } from './../controllers/admin/admin-audit-log.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminAboutUsController } from './../controllers/admin/admin-about-us.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AboutUsController } from './../controllers/about-us/about-us.controller';
import { expressAuthentication } from './../middlewares/auth.middleware';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';
const multer = require('multer');


const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "TripDifficulty": {
        "dataType": "refEnum",
        "enums": ["easy","moderate","challenging","strenuous","extreme"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicTrekSummaryDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "category": {"dataType":"string"},
            "categorySlug": {"dataType":"string"},
            "categoryId": {"dataType":"string"},
            "region": {"dataType":"string","required":true},
            "durationDays": {"dataType":"double","required":true},
            "maxAltitudeMeters": {"dataType":"double","required":true},
            "difficulty": {"ref":"TripDifficulty","required":true},
            "priceUSD": {"dataType":"double","required":true},
            "rating": {"dataType":"double","required":true},
            "reviewsCount": {"dataType":"double","required":true},
            "image": {"dataType":"string"},
            "shortDesc": {"dataType":"string","required":true},
            "country": {"dataType":"string"},
            "bestSeason": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginationMeta": {
        "dataType": "refObject",
        "properties": {
            "count": {"dataType":"double","required":true},
            "currentPage": {"dataType":"double","required":true},
            "nextPage": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "prevPage": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "lastPage": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicTrekSummaryDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"PublicTrekSummaryDto"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"PublicTrekSummaryDto"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TrekStatus": {
        "dataType": "refEnum",
        "enums": ["active","featured","draft"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_any_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"any"},{"dataType":"array","array":{"dataType":"any"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TripActivity": {
        "dataType": "refEnum",
        "enums": ["Trekking/Hiking","Cultural Sightseeing","Peak Climbing","Heli Trek & Tour","Wildlife Safari","Other"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TripItineraryDetail": {
        "dataType": "refObject",
        "properties": {
            "label": {"dataType":"string","required":true},
            "value": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TripItineraryDay": {
        "dataType": "refObject",
        "properties": {
            "day": {"dataType":"double","required":true},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "maxAltitude": {"dataType":"string"},
            "accommodation": {"dataType":"string"},
            "meals": {"dataType":"string"},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"TripItineraryDetail"}},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TripFaq": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "question": {"dataType":"string","required":true},
            "answer": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TripReview": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "author": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "date": {"dataType":"string"},
            "rating": {"dataType":"double","required":true},
            "avatar": {"dataType":"string"},
            "content": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TripDepartureDate": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "startDate": {"dataType":"string","required":true},
            "endDate": {"dataType":"string","required":true},
            "priceUSD": {"dataType":"double"},
            "status": {"dataType":"string"},
            "seatsAvailable": {"dataType":"double"},
            "notes": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TripPackageFile": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "mediaId": {"dataType":"string"},
            "title": {"dataType":"string","required":true},
            "fileUrl": {"dataType":"string"},
            "fileName": {"dataType":"string"},
            "fileSize": {"dataType":"string"},
            "fileType": {"dataType":"string"},
            "uploadedAt": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicTrekDetailDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "category": {"dataType":"string"},
            "categorySlug": {"dataType":"string"},
            "categoryId": {"dataType":"string"},
            "region": {"dataType":"string","required":true},
            "durationDays": {"dataType":"double","required":true},
            "maxAltitudeMeters": {"dataType":"double","required":true},
            "difficulty": {"ref":"TripDifficulty","required":true},
            "priceUSD": {"dataType":"double","required":true},
            "rating": {"dataType":"double","required":true},
            "reviewsCount": {"dataType":"double","required":true},
            "image": {"dataType":"string"},
            "shortDesc": {"dataType":"string","required":true},
            "country": {"dataType":"string"},
            "bestSeason": {"dataType":"string"},
            "activity": {"ref":"TripActivity"},
            "startEndLocation": {"dataType":"string"},
            "accommodation": {"dataType":"string"},
            "meals": {"dataType":"string"},
            "groupSizeRange": {"dataType":"string"},
            "inclusionsText": {"dataType":"string"},
            "exclusionsText": {"dataType":"string"},
            "addonsText": {"dataType":"string"},
            "usefulInfoText": {"dataType":"string"},
            "galleryImages": {"dataType":"array","array":{"dataType":"string"}},
            "mapImage": {"dataType":"string"},
            "itinerary": {"dataType":"array","array":{"dataType":"refObject","ref":"TripItineraryDay"}},
            "faqs": {"dataType":"array","array":{"dataType":"refObject","ref":"TripFaq"}},
            "reviews": {"dataType":"array","array":{"dataType":"refObject","ref":"TripReview"}},
            "departureDates": {"dataType":"array","array":{"dataType":"refObject","ref":"TripDepartureDate"}},
            "packageFiles": {"dataType":"array","array":{"dataType":"refObject","ref":"TripPackageFile"}},
            "metaTitle": {"dataType":"string"},
            "metaDescription": {"dataType":"string"},
            "keywords": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicTrekDetailDto_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"PublicTrekDetailDto"},{"dataType":"array","array":{"dataType":"refObject","ref":"PublicTrekDetailDto"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TourType": {
        "dataType": "refEnum",
        "enums": ["cultural_heritage","luxury_wellness","wildlife_safari","helicopter_tour","day_tour","other"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicTourSummaryDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "category": {"dataType":"string"},
            "categorySlug": {"dataType":"string"},
            "categoryId": {"dataType":"string"},
            "region": {"dataType":"string","required":true},
            "tourType": {"ref":"TourType","required":true},
            "transportation": {"dataType":"string"},
            "durationDays": {"dataType":"double","required":true},
            "maxAltitudeMeters": {"dataType":"double","required":true},
            "difficulty": {"ref":"TripDifficulty","required":true},
            "priceUSD": {"dataType":"double","required":true},
            "rating": {"dataType":"double","required":true},
            "reviewsCount": {"dataType":"double","required":true},
            "image": {"dataType":"string"},
            "shortDesc": {"dataType":"string","required":true},
            "country": {"dataType":"string"},
            "bestSeason": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicTourSummaryDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"PublicTourSummaryDto"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"PublicTourSummaryDto"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TourStatus": {
        "dataType": "refEnum",
        "enums": ["active","featured","draft"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicTourDetailDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "category": {"dataType":"string"},
            "categorySlug": {"dataType":"string"},
            "categoryId": {"dataType":"string"},
            "region": {"dataType":"string","required":true},
            "tourType": {"ref":"TourType","required":true},
            "transportation": {"dataType":"string"},
            "durationDays": {"dataType":"double","required":true},
            "maxAltitudeMeters": {"dataType":"double","required":true},
            "difficulty": {"ref":"TripDifficulty","required":true},
            "priceUSD": {"dataType":"double","required":true},
            "rating": {"dataType":"double","required":true},
            "reviewsCount": {"dataType":"double","required":true},
            "image": {"dataType":"string"},
            "shortDesc": {"dataType":"string","required":true},
            "country": {"dataType":"string"},
            "bestSeason": {"dataType":"string"},
            "activity": {"ref":"TripActivity"},
            "startEndLocation": {"dataType":"string"},
            "accommodation": {"dataType":"string"},
            "meals": {"dataType":"string"},
            "groupSizeRange": {"dataType":"string"},
            "inclusionsText": {"dataType":"string"},
            "exclusionsText": {"dataType":"string"},
            "addonsText": {"dataType":"string"},
            "usefulInfoText": {"dataType":"string"},
            "galleryImages": {"dataType":"array","array":{"dataType":"string"}},
            "mapImage": {"dataType":"string"},
            "itinerary": {"dataType":"array","array":{"dataType":"refObject","ref":"TripItineraryDay"}},
            "faqs": {"dataType":"array","array":{"dataType":"refObject","ref":"TripFaq"}},
            "reviews": {"dataType":"array","array":{"dataType":"refObject","ref":"TripReview"}},
            "departureDates": {"dataType":"array","array":{"dataType":"refObject","ref":"TripDepartureDate"}},
            "packageFiles": {"dataType":"array","array":{"dataType":"refObject","ref":"TripPackageFile"}},
            "metaTitle": {"dataType":"string"},
            "metaDescription": {"dataType":"string"},
            "keywords": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicTourDetailDto_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"PublicTourDetailDto"},{"dataType":"array","array":{"dataType":"refObject","ref":"PublicTourDetailDto"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicTestimonialDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "author": {"dataType":"string","required":true},
            "role": {"dataType":"string"},
            "country": {"dataType":"string"},
            "tripName": {"dataType":"string"},
            "content": {"dataType":"string","required":true},
            "avatar": {"dataType":"string"},
            "rating": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicTestimonialDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"PublicTestimonialDto"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"PublicTestimonialDto"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicTestimonialDto_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"PublicTestimonialDto"},{"dataType":"array","array":{"dataType":"refObject","ref":"PublicTestimonialDto"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicTeamMemberDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "role": {"dataType":"string","required":true},
            "bio": {"dataType":"string"},
            "avatar": {"dataType":"string"},
            "experience": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicTeamMemberDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"PublicTeamMemberDto"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"PublicTeamMemberDto"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicTeamMemberDto_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"PublicTeamMemberDto"},{"dataType":"array","array":{"dataType":"refObject","ref":"PublicTeamMemberDto"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicSettingDto": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"dataType":"string"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicSettingDto_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"PublicSettingDto"},{"dataType":"array","array":{"dataType":"refObject","ref":"PublicSettingDto"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NotificationType": {
        "dataType": "refEnum",
        "enums": ["inquiry","booking","quote","system"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Notification": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"datetime","required":true},
            "title": {"dataType":"string","required":true},
            "body": {"dataType":"string","required":true},
            "type": {"ref":"NotificationType","required":true},
            "isRead": {"dataType":"boolean","required":true},
            "refId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginatedNotificationResponse": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"dataType":"refObject","ref":"Notification"},"required":true},
            "total": {"dataType":"double","required":true},
            "unreadCount": {"dataType":"double","required":true},
            "page": {"dataType":"double","required":true},
            "limit": {"dataType":"double","required":true},
            "totalPages": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PaginatedNotificationResponse_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"PaginatedNotificationResponse"},{"dataType":"array","array":{"dataType":"refObject","ref":"PaginatedNotificationResponse"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginatedNotifications": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"dataType":"refObject","ref":"Notification"},"required":true},
            "total": {"dataType":"double","required":true},
            "unreadCount": {"dataType":"double","required":true},
            "limit": {"dataType":"double","required":true},
            "offset": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PaginatedNotifications_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"PaginatedNotifications"},{"dataType":"array","array":{"dataType":"refObject","ref":"PaginatedNotifications"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_number_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"array","array":{"dataType":"double"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_boolean_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"array","array":{"dataType":"boolean"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryType": {
        "dataType": "refEnum",
        "enums": ["trekking","tours","expeditions","blogs","media"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryStatus": {
        "dataType": "refEnum",
        "enums": ["active","draft"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Category": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"datetime","required":true},
            "name": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "type": {"ref":"CategoryType","required":true},
            "description": {"dataType":"string","required":true},
            "itemCount": {"dataType":"double","required":true},
            "status": {"ref":"CategoryStatus","required":true},
            "showInMenu": {"dataType":"boolean","required":true},
            "menuOrder": {"dataType":"double","required":true},
            "image": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "mediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "parentId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "parent": {"dataType":"union","subSchemas":[{"ref":"Category"},{"dataType":"enum","enums":[null]}]},
            "children": {"dataType":"array","array":{"dataType":"refObject","ref":"Category"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MediaUploadResult": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "categoryId": {"dataType":"string"},
            "categoryName": {"dataType":"string"},
            "category": {"ref":"Category"},
            "description": {"dataType":"string","required":true},
            "altText": {"dataType":"string","required":true},
            "url": {"dataType":"string","required":true},
            "mimeType": {"dataType":"string","required":true},
            "fileSize": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_MediaUploadResult_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"MediaUploadResult"},{"dataType":"array","array":{"dataType":"refObject","ref":"MediaUploadResult"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_MediaUploadResult-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"MediaUploadResult"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"MediaUploadResult"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateMediaDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "categoryId": {"dataType":"string"},
            "description": {"dataType":"string"},
            "altText": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InquiryStatus": {
        "dataType": "refEnum",
        "enums": ["New","Contacted","Quote Sent","Booked","Closed"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InquiryType": {
        "dataType": "refEnum",
        "enums": ["Trekking","Tour","Expedition","General"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Inquiry": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"datetime","required":true},
            "guestName": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "interestedTrip": {"dataType":"string","required":true},
            "travelDates": {"dataType":"string","required":true},
            "groupSize": {"dataType":"double","required":true},
            "message": {"dataType":"string","required":true},
            "status": {"ref":"InquiryStatus","required":true},
            "type": {"ref":"InquiryType","required":true},
            "notes": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Inquiry_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"Inquiry"},{"dataType":"array","array":{"dataType":"refObject","ref":"Inquiry"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateInquiryDto": {
        "dataType": "refObject",
        "properties": {
            "guestName": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "country": {"dataType":"string"},
            "interestedTrip": {"dataType":"string","required":true},
            "travelDates": {"dataType":"string"},
            "groupSize": {"dataType":"double","required":true},
            "message": {"dataType":"string","required":true},
            "status": {"ref":"InquiryStatus"},
            "type": {"ref":"InquiryType"},
            "notes": {"dataType":"string"},
            "cfTurnstileToken": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicFaqDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "question": {"dataType":"string","required":true},
            "answer": {"dataType":"string","required":true},
            "category": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicFaqDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"PublicFaqDto"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"PublicFaqDto"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicFaqDto_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"PublicFaqDto"},{"dataType":"array","array":{"dataType":"refObject","ref":"PublicFaqDto"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ClimbingGrade": {
        "dataType": "refEnum",
        "enums": ["Non-Technical Trekking Peak","Technical Alpine Grade","Extreme Technical Grade"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicExpeditionSummaryDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "category": {"dataType":"string"},
            "categorySlug": {"dataType":"string"},
            "categoryId": {"dataType":"string"},
            "region": {"dataType":"string","required":true},
            "durationDays": {"dataType":"double","required":true},
            "peakHeightM": {"dataType":"double","required":true},
            "maxAltitudeMeters": {"dataType":"double","required":true},
            "climbingGrade": {"ref":"ClimbingGrade","required":true},
            "difficulty": {"ref":"TripDifficulty","required":true},
            "sherpaGuideRatio": {"dataType":"string"},
            "oxygenRequired": {"dataType":"boolean"},
            "priceUSD": {"dataType":"double","required":true},
            "rating": {"dataType":"double","required":true},
            "reviewsCount": {"dataType":"double","required":true},
            "image": {"dataType":"string"},
            "shortDesc": {"dataType":"string","required":true},
            "country": {"dataType":"string"},
            "bestSeason": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicExpeditionSummaryDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"PublicExpeditionSummaryDto"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"PublicExpeditionSummaryDto"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ExpeditionStatus": {
        "dataType": "refEnum",
        "enums": ["active","featured","draft"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicExpeditionDetailDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "category": {"dataType":"string"},
            "categorySlug": {"dataType":"string"},
            "categoryId": {"dataType":"string"},
            "region": {"dataType":"string","required":true},
            "durationDays": {"dataType":"double","required":true},
            "peakHeightM": {"dataType":"double","required":true},
            "maxAltitudeMeters": {"dataType":"double","required":true},
            "climbingGrade": {"ref":"ClimbingGrade","required":true},
            "difficulty": {"ref":"TripDifficulty","required":true},
            "sherpaGuideRatio": {"dataType":"string"},
            "oxygenRequired": {"dataType":"boolean"},
            "priceUSD": {"dataType":"double","required":true},
            "rating": {"dataType":"double","required":true},
            "reviewsCount": {"dataType":"double","required":true},
            "image": {"dataType":"string"},
            "shortDesc": {"dataType":"string","required":true},
            "country": {"dataType":"string"},
            "bestSeason": {"dataType":"string"},
            "activity": {"ref":"TripActivity"},
            "startEndLocation": {"dataType":"string"},
            "accommodation": {"dataType":"string"},
            "meals": {"dataType":"string"},
            "groupSizeRange": {"dataType":"string"},
            "inclusionsText": {"dataType":"string"},
            "exclusionsText": {"dataType":"string"},
            "addonsText": {"dataType":"string"},
            "usefulInfoText": {"dataType":"string"},
            "galleryImages": {"dataType":"array","array":{"dataType":"string"}},
            "mapImage": {"dataType":"string"},
            "itinerary": {"dataType":"array","array":{"dataType":"refObject","ref":"TripItineraryDay"}},
            "faqs": {"dataType":"array","array":{"dataType":"refObject","ref":"TripFaq"}},
            "reviews": {"dataType":"array","array":{"dataType":"refObject","ref":"TripReview"}},
            "departureDates": {"dataType":"array","array":{"dataType":"refObject","ref":"TripDepartureDate"}},
            "packageFiles": {"dataType":"array","array":{"dataType":"refObject","ref":"TripPackageFile"}},
            "metaTitle": {"dataType":"string"},
            "metaDescription": {"dataType":"string"},
            "keywords": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicExpeditionDetailDto_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"PublicExpeditionDetailDto"},{"dataType":"array","array":{"dataType":"refObject","ref":"PublicExpeditionDetailDto"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingPackageType": {
        "dataType": "refEnum",
        "enums": ["trekking","expedition","tour"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingPaymentStatus": {
        "dataType": "refEnum",
        "enums": ["paid","deposit_paid","pending","refunded"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingStatus": {
        "dataType": "refEnum",
        "enums": ["confirmed","in_review","active_trek","completed","cancelled"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingPermitStatus": {
        "dataType": "refEnum",
        "enums": ["issued","processing","pending_document"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Booking": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"datetime","required":true},
            "reference": {"dataType":"string","required":true},
            "guestName": {"dataType":"string","required":true},
            "guestEmail": {"dataType":"string","required":true},
            "guestPhone": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "packageName": {"dataType":"string","required":true},
            "packageType": {"ref":"BookingPackageType","required":true},
            "startDate": {"dataType":"string","required":true},
            "endDate": {"dataType":"string","required":true},
            "groupSize": {"dataType":"double","required":true},
            "totalAmountUSD": {"dataType":"double","required":true},
            "paymentStatus": {"ref":"BookingPaymentStatus","required":true},
            "bookingStatus": {"ref":"BookingStatus","required":true},
            "assignedGuide": {"dataType":"string","required":true},
            "permitStatus": {"ref":"BookingPermitStatus","required":true},
            "specialRequests": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DashboardMetricsResponse": {
        "dataType": "refObject",
        "properties": {
            "totalRevenueUSD": {"dataType":"double","required":true},
            "revenueChangePercent": {"dataType":"double","required":true},
            "activeExpeditions": {"dataType":"double","required":true},
            "climbersOnMountain": {"dataType":"double","required":true},
            "pendingBookings": {"dataType":"double","required":true},
            "pendingInquiries": {"dataType":"double","required":true},
            "timsPermitsProcessing": {"dataType":"double","required":true},
            "recentBookings": {"dataType":"array","array":{"dataType":"refObject","ref":"Booking"},"required":true},
            "featuredPackages": {"dataType":"array","array":{"dataType":"any"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_DashboardMetricsResponse_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"DashboardMetricsResponse"},{"dataType":"array","array":{"dataType":"refObject","ref":"DashboardMetricsResponse"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicCategoryDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "type": {"ref":"CategoryType","required":true},
            "description": {"dataType":"string"},
            "itemCount": {"dataType":"double","required":true},
            "image": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "parentId": {"dataType":"string"},
            "children": {"dataType":"array","array":{"dataType":"refObject","ref":"PublicCategoryDto"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicCategoryDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"PublicCategoryDto"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"PublicCategoryDto"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicCategoryDto_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"PublicCategoryDto"},{"dataType":"array","array":{"dataType":"refObject","ref":"PublicCategoryDto"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Booking_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"Booking"},{"dataType":"array","array":{"dataType":"refObject","ref":"Booking"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateBookingDto": {
        "dataType": "refObject",
        "properties": {
            "guestName": {"dataType":"string","required":true},
            "guestEmail": {"dataType":"string","required":true},
            "guestPhone": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "packageName": {"dataType":"string","required":true},
            "packageType": {"ref":"BookingPackageType","required":true},
            "startDate": {"dataType":"string","required":true},
            "endDate": {"dataType":"string","required":true},
            "groupSize": {"dataType":"double","required":true},
            "totalAmountUSD": {"dataType":"double","required":true},
            "paymentStatus": {"ref":"BookingPaymentStatus"},
            "bookingStatus": {"ref":"BookingStatus"},
            "assignedGuide": {"dataType":"string"},
            "permitStatus": {"ref":"BookingPermitStatus"},
            "specialRequests": {"dataType":"string"},
            "cfTurnstileToken": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicBlogSummaryDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "category": {"dataType":"string","required":true},
            "readTime": {"dataType":"string","required":true},
            "publishedDate": {"dataType":"string"},
            "excerpt": {"dataType":"string"},
            "image": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicBlogSummaryDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"PublicBlogSummaryDto"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"PublicBlogSummaryDto"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BlogStatus": {
        "dataType": "refEnum",
        "enums": ["published","draft","archived"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicBlogDetailDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "category": {"dataType":"string","required":true},
            "readTime": {"dataType":"string","required":true},
            "publishedDate": {"dataType":"string"},
            "excerpt": {"dataType":"string"},
            "image": {"dataType":"string"},
            "content": {"dataType":"string"},
            "views": {"dataType":"double"},
            "metaTitle": {"dataType":"string"},
            "metaDescription": {"dataType":"string"},
            "keywords": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicBlogDetailDto_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"PublicBlogDetailDto"},{"dataType":"array","array":{"dataType":"refObject","ref":"PublicBlogDetailDto"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdminRole": {
        "dataType": "refEnum",
        "enums": ["Admin"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdminLoginResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "role": {"ref":"AdminRole","required":true},
            "avatarUrl": {"dataType":"string"},
            "token": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_AdminLoginResponse_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"AdminLoginResponse"},{"dataType":"array","array":{"dataType":"refObject","ref":"AdminLoginResponse"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdminAuthSchema": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_null_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":[null]},{"dataType":"array","array":{"dataType":"enum","enums":[null]}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Trek": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"datetime","required":true},
            "coverMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "mapMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "galleryMediaIds": {"dataType":"array","array":{"dataType":"string"}},
            "title": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "categoryId": {"dataType":"string","required":true},
            "subcategoryId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "region": {"dataType":"string","required":true},
            "durationDays": {"dataType":"double","required":true},
            "maxAltitudeMeters": {"dataType":"double","required":true},
            "difficulty": {"ref":"TripDifficulty","required":true},
            "priceUSD": {"dataType":"double","required":true},
            "status": {"ref":"TrekStatus","required":true},
            "totalBookings": {"dataType":"double","required":true},
            "rating": {"dataType":"double","required":true},
            "reviewsCount": {"dataType":"double","required":true},
            "image": {"dataType":"string"},
            "galleryImages": {"dataType":"array","array":{"dataType":"string"}},
            "mapImage": {"dataType":"string"},
            "shortDesc": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "activity": {"ref":"TripActivity","required":true},
            "bestSeason": {"dataType":"string","required":true},
            "startEndLocation": {"dataType":"string","required":true},
            "accommodation": {"dataType":"string","required":true},
            "meals": {"dataType":"string","required":true},
            "groupSizeRange": {"dataType":"string","required":true},
            "inclusionsText": {"dataType":"string","required":true},
            "exclusionsText": {"dataType":"string","required":true},
            "itinerary": {"dataType":"array","array":{"dataType":"refObject","ref":"TripItineraryDay"},"required":true},
            "faqs": {"dataType":"array","array":{"dataType":"refObject","ref":"TripFaq"},"required":true},
            "reviews": {"dataType":"array","array":{"dataType":"refObject","ref":"TripReview"},"required":true},
            "addonsText": {"dataType":"string","required":true},
            "usefulInfoText": {"dataType":"string","required":true},
            "departureDates": {"dataType":"array","array":{"dataType":"refObject","ref":"TripDepartureDate"},"required":true},
            "packageFiles": {"dataType":"array","array":{"dataType":"refObject","ref":"TripPackageFile"},"required":true},
            "metaTitle": {"dataType":"string","required":true},
            "metaDescription": {"dataType":"string","required":true},
            "keywords": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Trek-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"Trek"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"Trek"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Trek_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"Trek"},{"dataType":"array","array":{"dataType":"refObject","ref":"Trek"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TripItineraryDetailDto": {
        "dataType": "refObject",
        "properties": {
            "label": {"dataType":"string","required":true},
            "value": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TripItineraryDayDto": {
        "dataType": "refObject",
        "properties": {
            "day": {"dataType":"double","required":true},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "maxAltitude": {"dataType":"string"},
            "accommodation": {"dataType":"string"},
            "meals": {"dataType":"string"},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"TripItineraryDetailDto"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TripFaqDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "question": {"dataType":"string","required":true},
            "answer": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TripReviewDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "author": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "date": {"dataType":"string"},
            "rating": {"dataType":"double","required":true},
            "avatar": {"dataType":"string"},
            "content": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TripDepartureDateDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "startDate": {"dataType":"string","required":true},
            "endDate": {"dataType":"string","required":true},
            "priceUSD": {"dataType":"double"},
            "status": {"dataType":"string"},
            "seatsAvailable": {"dataType":"double"},
            "notes": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TripPackageFileDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "mediaId": {"dataType":"string"},
            "title": {"dataType":"string","required":true},
            "fileUrl": {"dataType":"string"},
            "fileName": {"dataType":"string"},
            "fileSize": {"dataType":"string"},
            "fileType": {"dataType":"string"},
            "uploadedAt": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateTrekDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "categoryId": {"dataType":"string"},
            "subcategoryId": {"dataType":"string"},
            "region": {"dataType":"string","required":true},
            "durationDays": {"dataType":"double","required":true},
            "maxAltitudeMeters": {"dataType":"double"},
            "difficulty": {"ref":"TripDifficulty"},
            "priceUSD": {"dataType":"double","required":true},
            "status": {"ref":"TrekStatus"},
            "shortDesc": {"dataType":"string"},
            "country": {"dataType":"string"},
            "activity": {"ref":"TripActivity"},
            "bestSeason": {"dataType":"string"},
            "startEndLocation": {"dataType":"string"},
            "accommodation": {"dataType":"string"},
            "meals": {"dataType":"string"},
            "groupSizeRange": {"dataType":"string"},
            "inclusionsText": {"dataType":"string"},
            "exclusionsText": {"dataType":"string"},
            "itinerary": {"dataType":"array","array":{"dataType":"refObject","ref":"TripItineraryDayDto"}},
            "faqs": {"dataType":"array","array":{"dataType":"refObject","ref":"TripFaqDto"}},
            "reviews": {"dataType":"array","array":{"dataType":"refObject","ref":"TripReviewDto"}},
            "addonsText": {"dataType":"string"},
            "usefulInfoText": {"dataType":"string"},
            "departureDates": {"dataType":"array","array":{"dataType":"refObject","ref":"TripDepartureDateDto"}},
            "packageFiles": {"dataType":"array","array":{"dataType":"refObject","ref":"TripPackageFileDto"}},
            "coverMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "mapMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "galleryMediaIds": {"dataType":"array","array":{"dataType":"string"}},
            "metaTitle": {"dataType":"string"},
            "metaDescription": {"dataType":"string"},
            "keywords": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateTrekDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "categoryId": {"dataType":"string"},
            "subcategoryId": {"dataType":"string"},
            "region": {"dataType":"string"},
            "durationDays": {"dataType":"double"},
            "maxAltitudeMeters": {"dataType":"double"},
            "difficulty": {"ref":"TripDifficulty"},
            "priceUSD": {"dataType":"double"},
            "status": {"ref":"TrekStatus"},
            "shortDesc": {"dataType":"string"},
            "country": {"dataType":"string"},
            "activity": {"ref":"TripActivity"},
            "bestSeason": {"dataType":"string"},
            "startEndLocation": {"dataType":"string"},
            "accommodation": {"dataType":"string"},
            "meals": {"dataType":"string"},
            "groupSizeRange": {"dataType":"string"},
            "inclusionsText": {"dataType":"string"},
            "exclusionsText": {"dataType":"string"},
            "itinerary": {"dataType":"array","array":{"dataType":"refObject","ref":"TripItineraryDayDto"}},
            "faqs": {"dataType":"array","array":{"dataType":"refObject","ref":"TripFaqDto"}},
            "reviews": {"dataType":"array","array":{"dataType":"refObject","ref":"TripReviewDto"}},
            "addonsText": {"dataType":"string"},
            "usefulInfoText": {"dataType":"string"},
            "departureDates": {"dataType":"array","array":{"dataType":"refObject","ref":"TripDepartureDateDto"}},
            "packageFiles": {"dataType":"array","array":{"dataType":"refObject","ref":"TripPackageFileDto"}},
            "coverMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "mapMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "galleryMediaIds": {"dataType":"array","array":{"dataType":"string"}},
            "metaTitle": {"dataType":"string"},
            "metaDescription": {"dataType":"string"},
            "keywords": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Tour": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"datetime","required":true},
            "coverMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "mapMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "galleryMediaIds": {"dataType":"array","array":{"dataType":"string"}},
            "title": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "categoryId": {"dataType":"string","required":true},
            "subcategoryId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "region": {"dataType":"string","required":true},
            "tourType": {"ref":"TourType","required":true},
            "transportation": {"dataType":"string","required":true},
            "durationDays": {"dataType":"double","required":true},
            "maxAltitudeMeters": {"dataType":"double","required":true},
            "difficulty": {"ref":"TripDifficulty","required":true},
            "priceUSD": {"dataType":"double","required":true},
            "status": {"ref":"TourStatus","required":true},
            "totalBookings": {"dataType":"double","required":true},
            "rating": {"dataType":"double","required":true},
            "reviewsCount": {"dataType":"double","required":true},
            "image": {"dataType":"string"},
            "galleryImages": {"dataType":"array","array":{"dataType":"string"}},
            "mapImage": {"dataType":"string"},
            "shortDesc": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "activity": {"ref":"TripActivity","required":true},
            "bestSeason": {"dataType":"string","required":true},
            "startEndLocation": {"dataType":"string","required":true},
            "accommodation": {"dataType":"string","required":true},
            "meals": {"dataType":"string","required":true},
            "groupSizeRange": {"dataType":"string","required":true},
            "inclusionsText": {"dataType":"string","required":true},
            "exclusionsText": {"dataType":"string","required":true},
            "itinerary": {"dataType":"array","array":{"dataType":"refObject","ref":"TripItineraryDay"},"required":true},
            "faqs": {"dataType":"array","array":{"dataType":"refObject","ref":"TripFaq"},"required":true},
            "reviews": {"dataType":"array","array":{"dataType":"refObject","ref":"TripReview"},"required":true},
            "addonsText": {"dataType":"string","required":true},
            "usefulInfoText": {"dataType":"string","required":true},
            "departureDates": {"dataType":"array","array":{"dataType":"refObject","ref":"TripDepartureDate"},"required":true},
            "packageFiles": {"dataType":"array","array":{"dataType":"refObject","ref":"TripPackageFile"},"required":true},
            "metaTitle": {"dataType":"string","required":true},
            "metaDescription": {"dataType":"string","required":true},
            "keywords": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Tour-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"Tour"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"Tour"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Tour_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"Tour"},{"dataType":"array","array":{"dataType":"refObject","ref":"Tour"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateTourDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "categoryId": {"dataType":"string"},
            "subcategoryId": {"dataType":"string"},
            "region": {"dataType":"string","required":true},
            "tourType": {"ref":"TourType"},
            "transportation": {"dataType":"string"},
            "durationDays": {"dataType":"double","required":true},
            "maxAltitudeMeters": {"dataType":"double"},
            "difficulty": {"ref":"TripDifficulty"},
            "priceUSD": {"dataType":"double","required":true},
            "status": {"ref":"TourStatus"},
            "shortDesc": {"dataType":"string"},
            "country": {"dataType":"string"},
            "activity": {"ref":"TripActivity"},
            "bestSeason": {"dataType":"string"},
            "startEndLocation": {"dataType":"string"},
            "accommodation": {"dataType":"string"},
            "meals": {"dataType":"string"},
            "groupSizeRange": {"dataType":"string"},
            "inclusionsText": {"dataType":"string"},
            "exclusionsText": {"dataType":"string"},
            "itinerary": {"dataType":"array","array":{"dataType":"refObject","ref":"TripItineraryDayDto"}},
            "faqs": {"dataType":"array","array":{"dataType":"refObject","ref":"TripFaqDto"}},
            "reviews": {"dataType":"array","array":{"dataType":"refObject","ref":"TripReviewDto"}},
            "addonsText": {"dataType":"string"},
            "usefulInfoText": {"dataType":"string"},
            "departureDates": {"dataType":"array","array":{"dataType":"refObject","ref":"TripDepartureDateDto"}},
            "packageFiles": {"dataType":"array","array":{"dataType":"refObject","ref":"TripPackageFileDto"}},
            "coverMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "mapMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "galleryMediaIds": {"dataType":"array","array":{"dataType":"string"}},
            "metaTitle": {"dataType":"string"},
            "metaDescription": {"dataType":"string"},
            "keywords": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateTourDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "categoryId": {"dataType":"string"},
            "subcategoryId": {"dataType":"string"},
            "region": {"dataType":"string"},
            "tourType": {"ref":"TourType"},
            "transportation": {"dataType":"string"},
            "durationDays": {"dataType":"double"},
            "maxAltitudeMeters": {"dataType":"double"},
            "difficulty": {"ref":"TripDifficulty"},
            "priceUSD": {"dataType":"double"},
            "status": {"ref":"TourStatus"},
            "shortDesc": {"dataType":"string"},
            "country": {"dataType":"string"},
            "activity": {"ref":"TripActivity"},
            "bestSeason": {"dataType":"string"},
            "startEndLocation": {"dataType":"string"},
            "accommodation": {"dataType":"string"},
            "meals": {"dataType":"string"},
            "groupSizeRange": {"dataType":"string"},
            "inclusionsText": {"dataType":"string"},
            "exclusionsText": {"dataType":"string"},
            "itinerary": {"dataType":"array","array":{"dataType":"refObject","ref":"TripItineraryDayDto"}},
            "faqs": {"dataType":"array","array":{"dataType":"refObject","ref":"TripFaqDto"}},
            "reviews": {"dataType":"array","array":{"dataType":"refObject","ref":"TripReviewDto"}},
            "addonsText": {"dataType":"string"},
            "usefulInfoText": {"dataType":"string"},
            "departureDates": {"dataType":"array","array":{"dataType":"refObject","ref":"TripDepartureDateDto"}},
            "packageFiles": {"dataType":"array","array":{"dataType":"refObject","ref":"TripPackageFileDto"}},
            "coverMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "mapMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "galleryMediaIds": {"dataType":"array","array":{"dataType":"string"}},
            "metaTitle": {"dataType":"string"},
            "metaDescription": {"dataType":"string"},
            "keywords": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TestimonialStatus": {
        "dataType": "refEnum",
        "enums": ["active","inactive"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Testimonial": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"datetime","required":true},
            "author": {"dataType":"string","required":true},
            "role": {"dataType":"string"},
            "country": {"dataType":"string"},
            "tripName": {"dataType":"string"},
            "content": {"dataType":"string","required":true},
            "avatar": {"dataType":"string"},
            "avatarMediaId": {"dataType":"string"},
            "rating": {"dataType":"double","required":true},
            "status": {"ref":"TestimonialStatus","required":true},
            "order": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Testimonial-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"Testimonial"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"Testimonial"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReorderTestimonialItemDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "order": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReorderTestimonialsDto": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"dataType":"refObject","ref":"ReorderTestimonialItemDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Testimonial_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"Testimonial"},{"dataType":"array","array":{"dataType":"refObject","ref":"Testimonial"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateTestimonialDto": {
        "dataType": "refObject",
        "properties": {
            "author": {"dataType":"string","required":true},
            "role": {"dataType":"string"},
            "country": {"dataType":"string"},
            "tripName": {"dataType":"string"},
            "content": {"dataType":"string","required":true},
            "avatarMediaId": {"dataType":"string"},
            "rating": {"dataType":"double"},
            "status": {"ref":"TestimonialStatus"},
            "order": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateTestimonialDto": {
        "dataType": "refObject",
        "properties": {
            "author": {"dataType":"string"},
            "role": {"dataType":"string"},
            "country": {"dataType":"string"},
            "tripName": {"dataType":"string"},
            "content": {"dataType":"string"},
            "avatarMediaId": {"dataType":"string"},
            "rating": {"dataType":"double"},
            "status": {"ref":"TestimonialStatus"},
            "order": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TeamMemberStatus": {
        "dataType": "refEnum",
        "enums": ["active","inactive"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TeamMember": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"datetime","required":true},
            "name": {"dataType":"string","required":true},
            "role": {"dataType":"string","required":true},
            "bio": {"dataType":"string"},
            "avatar": {"dataType":"string"},
            "avatarMediaId": {"dataType":"string"},
            "experience": {"dataType":"string"},
            "status": {"ref":"TeamMemberStatus","required":true},
            "order": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_TeamMember-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"TeamMember"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"TeamMember"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReorderTeamMemberItemDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "order": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReorderTeamMembersDto": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"dataType":"refObject","ref":"ReorderTeamMemberItemDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_TeamMember_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"TeamMember"},{"dataType":"array","array":{"dataType":"refObject","ref":"TeamMember"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateTeamMemberDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "role": {"dataType":"string","required":true},
            "bio": {"dataType":"string"},
            "avatarMediaId": {"dataType":"string"},
            "experience": {"dataType":"string"},
            "status": {"ref":"TeamMemberStatus"},
            "order": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateTeamMemberDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "role": {"dataType":"string"},
            "bio": {"dataType":"string"},
            "avatarMediaId": {"dataType":"string"},
            "experience": {"dataType":"string"},
            "status": {"ref":"TeamMemberStatus"},
            "order": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.string_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Record_string.string__": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"Record_string.string_"},{"dataType":"array","array":{"dataType":"refAlias","ref":"Record_string.string_"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateSettingsDto": {
        "dataType": "refObject",
        "properties": {
            "siteName": {"dataType":"string"},
            "tagline": {"dataType":"string"},
            "siteDescription": {"dataType":"string"},
            "contactEmail": {"dataType":"string"},
            "contactPhone": {"dataType":"string"},
            "emergencyPhone": {"dataType":"string"},
            "whatsappNumber": {"dataType":"string"},
            "companyAddress": {"dataType":"string"},
            "googleMapsUrl": {"dataType":"string"},
            "officeHours": {"dataType":"string"},
            "metaTitle": {"dataType":"string"},
            "metaDescription": {"dataType":"string"},
            "metaKeywords": {"dataType":"string"},
            "canonicalUrl": {"dataType":"string"},
            "googleAnalyticsId": {"dataType":"string"},
            "googleSiteVerification": {"dataType":"string"},
            "facebookUrl": {"dataType":"string"},
            "instagramUrl": {"dataType":"string"},
            "youtubeUrl": {"dataType":"string"},
            "tripadvisorUrl": {"dataType":"string"},
            "linkedinUrl": {"dataType":"string"},
            "siteTitle": {"dataType":"string"},
            "homeStats": {"dataType":"any"},
            "companyFaqs": {"dataType":"any"},
            "testimonials": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdminSearchResultItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["trek"]},{"dataType":"enum","enums":["tour"]},{"dataType":"enum","enums":["expedition"]},{"dataType":"enum","enums":["category"]},{"dataType":"enum","enums":["booking"]},{"dataType":"enum","enums":["inquiry"]},{"dataType":"enum","enums":["blog"]},{"dataType":"enum","enums":["testimonial"]},{"dataType":"enum","enums":["team"]},{"dataType":"enum","enums":["faq"]},{"dataType":"enum","enums":["media"]}],"required":true},
            "typeLabel": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "subtitle": {"dataType":"string","required":true},
            "route": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdminSearchResponse": {
        "dataType": "refObject",
        "properties": {
            "query": {"dataType":"string","required":true},
            "totalResults": {"dataType":"double","required":true},
            "results": {"dataType":"array","array":{"dataType":"refObject","ref":"AdminSearchResultItem"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_AdminSearchResponse_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"AdminSearchResponse"},{"dataType":"array","array":{"dataType":"refObject","ref":"AdminSearchResponse"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Inquiry-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"Inquiry"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"Inquiry"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateInquiryDto": {
        "dataType": "refObject",
        "properties": {
            "status": {"ref":"InquiryStatus"},
            "type": {"ref":"InquiryType"},
            "notes": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendQuoteDto": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FaqStatus": {
        "dataType": "refEnum",
        "enums": ["active","draft"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Faq": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"datetime","required":true},
            "question": {"dataType":"string","required":true},
            "answer": {"dataType":"string","required":true},
            "category": {"dataType":"string","required":true},
            "status": {"ref":"FaqStatus","required":true},
            "order": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Faq-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"Faq"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"Faq"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReorderFaqItemDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "order": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReorderFaqsDto": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"dataType":"refObject","ref":"ReorderFaqItemDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Faq_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"Faq"},{"dataType":"array","array":{"dataType":"refObject","ref":"Faq"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateFaqDto": {
        "dataType": "refObject",
        "properties": {
            "question": {"dataType":"string","required":true},
            "answer": {"dataType":"string","required":true},
            "category": {"dataType":"string"},
            "status": {"ref":"FaqStatus"},
            "order": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateFaqDto": {
        "dataType": "refObject",
        "properties": {
            "question": {"dataType":"string"},
            "answer": {"dataType":"string"},
            "category": {"dataType":"string"},
            "status": {"ref":"FaqStatus"},
            "order": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Expedition": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"datetime","required":true},
            "coverMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "mapMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "galleryMediaIds": {"dataType":"array","array":{"dataType":"string"}},
            "title": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "categoryId": {"dataType":"string","required":true},
            "subcategoryId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "region": {"dataType":"string","required":true},
            "durationDays": {"dataType":"double","required":true},
            "peakHeightM": {"dataType":"double","required":true},
            "maxAltitudeMeters": {"dataType":"double","required":true},
            "climbingGrade": {"ref":"ClimbingGrade","required":true},
            "difficulty": {"ref":"TripDifficulty","required":true},
            "sherpaGuideRatio": {"dataType":"string","required":true},
            "oxygenRequired": {"dataType":"boolean","required":true},
            "priceUSD": {"dataType":"double","required":true},
            "status": {"ref":"ExpeditionStatus","required":true},
            "totalBookings": {"dataType":"double","required":true},
            "rating": {"dataType":"double","required":true},
            "reviewsCount": {"dataType":"double","required":true},
            "image": {"dataType":"string"},
            "galleryImages": {"dataType":"array","array":{"dataType":"string"}},
            "mapImage": {"dataType":"string"},
            "shortDesc": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "activity": {"ref":"TripActivity","required":true},
            "bestSeason": {"dataType":"string","required":true},
            "startEndLocation": {"dataType":"string","required":true},
            "accommodation": {"dataType":"string","required":true},
            "meals": {"dataType":"string","required":true},
            "groupSizeRange": {"dataType":"string","required":true},
            "inclusionsText": {"dataType":"string","required":true},
            "exclusionsText": {"dataType":"string","required":true},
            "itinerary": {"dataType":"array","array":{"dataType":"refObject","ref":"TripItineraryDay"},"required":true},
            "faqs": {"dataType":"array","array":{"dataType":"refObject","ref":"TripFaq"},"required":true},
            "reviews": {"dataType":"array","array":{"dataType":"refObject","ref":"TripReview"},"required":true},
            "addonsText": {"dataType":"string","required":true},
            "usefulInfoText": {"dataType":"string","required":true},
            "departureDates": {"dataType":"array","array":{"dataType":"refObject","ref":"TripDepartureDate"},"required":true},
            "packageFiles": {"dataType":"array","array":{"dataType":"refObject","ref":"TripPackageFile"},"required":true},
            "metaTitle": {"dataType":"string","required":true},
            "metaDescription": {"dataType":"string","required":true},
            "keywords": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Expedition-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"Expedition"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"Expedition"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Expedition_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"Expedition"},{"dataType":"array","array":{"dataType":"refObject","ref":"Expedition"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateExpeditionDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "categoryId": {"dataType":"string"},
            "subcategoryId": {"dataType":"string"},
            "region": {"dataType":"string","required":true},
            "durationDays": {"dataType":"double","required":true},
            "peakHeightM": {"dataType":"double"},
            "maxAltitudeMeters": {"dataType":"double"},
            "climbingGrade": {"ref":"ClimbingGrade"},
            "difficulty": {"ref":"TripDifficulty"},
            "sherpaGuideRatio": {"dataType":"string"},
            "oxygenRequired": {"dataType":"boolean"},
            "priceUSD": {"dataType":"double","required":true},
            "status": {"ref":"ExpeditionStatus"},
            "shortDesc": {"dataType":"string"},
            "country": {"dataType":"string"},
            "activity": {"ref":"TripActivity"},
            "bestSeason": {"dataType":"string"},
            "startEndLocation": {"dataType":"string"},
            "accommodation": {"dataType":"string"},
            "meals": {"dataType":"string"},
            "groupSizeRange": {"dataType":"string"},
            "inclusionsText": {"dataType":"string"},
            "exclusionsText": {"dataType":"string"},
            "itinerary": {"dataType":"array","array":{"dataType":"refObject","ref":"TripItineraryDayDto"}},
            "faqs": {"dataType":"array","array":{"dataType":"refObject","ref":"TripFaqDto"}},
            "reviews": {"dataType":"array","array":{"dataType":"refObject","ref":"TripReviewDto"}},
            "addonsText": {"dataType":"string"},
            "usefulInfoText": {"dataType":"string"},
            "departureDates": {"dataType":"array","array":{"dataType":"refObject","ref":"TripDepartureDateDto"}},
            "packageFiles": {"dataType":"array","array":{"dataType":"refObject","ref":"TripPackageFileDto"}},
            "coverMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "mapMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "galleryMediaIds": {"dataType":"array","array":{"dataType":"string"}},
            "metaTitle": {"dataType":"string"},
            "metaDescription": {"dataType":"string"},
            "keywords": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateExpeditionDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "categoryId": {"dataType":"string"},
            "subcategoryId": {"dataType":"string"},
            "region": {"dataType":"string"},
            "durationDays": {"dataType":"double"},
            "peakHeightM": {"dataType":"double"},
            "maxAltitudeMeters": {"dataType":"double"},
            "climbingGrade": {"ref":"ClimbingGrade"},
            "difficulty": {"ref":"TripDifficulty"},
            "sherpaGuideRatio": {"dataType":"string"},
            "oxygenRequired": {"dataType":"boolean"},
            "priceUSD": {"dataType":"double"},
            "status": {"ref":"ExpeditionStatus"},
            "shortDesc": {"dataType":"string"},
            "country": {"dataType":"string"},
            "activity": {"ref":"TripActivity"},
            "bestSeason": {"dataType":"string"},
            "startEndLocation": {"dataType":"string"},
            "accommodation": {"dataType":"string"},
            "meals": {"dataType":"string"},
            "groupSizeRange": {"dataType":"string"},
            "inclusionsText": {"dataType":"string"},
            "exclusionsText": {"dataType":"string"},
            "itinerary": {"dataType":"array","array":{"dataType":"refObject","ref":"TripItineraryDayDto"}},
            "faqs": {"dataType":"array","array":{"dataType":"refObject","ref":"TripFaqDto"}},
            "reviews": {"dataType":"array","array":{"dataType":"refObject","ref":"TripReviewDto"}},
            "addonsText": {"dataType":"string"},
            "usefulInfoText": {"dataType":"string"},
            "departureDates": {"dataType":"array","array":{"dataType":"refObject","ref":"TripDepartureDateDto"}},
            "packageFiles": {"dataType":"array","array":{"dataType":"refObject","ref":"TripPackageFileDto"}},
            "coverMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "mapMediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "galleryMediaIds": {"dataType":"array","array":{"dataType":"string"}},
            "metaTitle": {"dataType":"string"},
            "metaDescription": {"dataType":"string"},
            "keywords": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Category-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"Category"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"Category"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MenuSubcategoryDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "menuOrder": {"dataType":"double","required":true},
            "showInMenu": {"dataType":"boolean","required":true},
            "status": {"ref":"CategoryStatus","required":true},
            "type": {"ref":"CategoryType","required":true},
            "parentId": {"dataType":"string","required":true},
            "itemCount": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MenuCategoryDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "menuOrder": {"dataType":"double","required":true},
            "showInMenu": {"dataType":"boolean","required":true},
            "status": {"ref":"CategoryStatus","required":true},
            "type": {"ref":"CategoryType","required":true},
            "parentId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "itemCount": {"dataType":"double"},
            "subcategories": {"dataType":"array","array":{"dataType":"refObject","ref":"MenuSubcategoryDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_MenuCategoryDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"MenuCategoryDto"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"MenuCategoryDto"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Category_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"Category"},{"dataType":"array","array":{"dataType":"refObject","ref":"Category"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateCategoryDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "type": {"ref":"CategoryType","required":true},
            "description": {"dataType":"string","required":true},
            "status": {"ref":"CategoryStatus","required":true},
            "showInMenu": {"dataType":"boolean"},
            "menuOrder": {"dataType":"double"},
            "mediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "parentId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateCategoryDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "slug": {"dataType":"string"},
            "type": {"ref":"CategoryType"},
            "description": {"dataType":"string"},
            "status": {"ref":"CategoryStatus"},
            "showInMenu": {"dataType":"boolean"},
            "menuOrder": {"dataType":"double"},
            "mediaId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "parentId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_Booking-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"Booking"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"Booking"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateBookingDto": {
        "dataType": "refObject",
        "properties": {
            "guestName": {"dataType":"string"},
            "guestEmail": {"dataType":"string"},
            "guestPhone": {"dataType":"string"},
            "country": {"dataType":"string"},
            "packageName": {"dataType":"string"},
            "packageType": {"ref":"BookingPackageType"},
            "startDate": {"dataType":"string"},
            "endDate": {"dataType":"string"},
            "groupSize": {"dataType":"double"},
            "totalAmountUSD": {"dataType":"double"},
            "paymentStatus": {"ref":"BookingPaymentStatus"},
            "bookingStatus": {"ref":"BookingStatus"},
            "assignedGuide": {"dataType":"string"},
            "permitStatus": {"ref":"BookingPermitStatus"},
            "specialRequests": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BlogArticle": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"datetime","required":true},
            "title": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "category": {"dataType":"string","required":true},
            "readTime": {"dataType":"string","required":true},
            "status": {"ref":"BlogStatus","required":true},
            "publishedDate": {"dataType":"string","required":true},
            "views": {"dataType":"double","required":true},
            "excerpt": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
            "coverMediaId": {"dataType":"string"},
            "image": {"dataType":"string"},
            "metaTitle": {"dataType":"string"},
            "metaDescription": {"dataType":"string"},
            "keywords": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_BlogArticle-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"BlogArticle"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"BlogArticle"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_BlogArticle_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"BlogArticle"},{"dataType":"array","array":{"dataType":"refObject","ref":"BlogArticle"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateBlogArticleDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "category": {"dataType":"string","required":true},
            "categoryId": {"dataType":"string"},
            "readTime": {"dataType":"string"},
            "status": {"ref":"BlogStatus","required":true},
            "publishedDate": {"dataType":"string"},
            "excerpt": {"dataType":"string"},
            "content": {"dataType":"string"},
            "coverMediaId": {"dataType":"string"},
            "metaTitle": {"dataType":"string"},
            "metaDescription": {"dataType":"string"},
            "keywords": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateBlogArticleDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "category": {"dataType":"string"},
            "categoryId": {"dataType":"string"},
            "readTime": {"dataType":"string"},
            "status": {"ref":"BlogStatus"},
            "publishedDate": {"dataType":"string"},
            "excerpt": {"dataType":"string"},
            "content": {"dataType":"string"},
            "coverMediaId": {"dataType":"string"},
            "views": {"dataType":"double"},
            "metaTitle": {"dataType":"string"},
            "metaDescription": {"dataType":"string"},
            "keywords": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BackupResult": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "timestamp": {"dataType":"string","required":true},
            "schemaKey": {"dataType":"string"},
            "dataKey": {"dataType":"string"},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_BackupResult_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"BackupResult"},{"dataType":"array","array":{"dataType":"refObject","ref":"BackupResult"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuditLog": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "action": {"dataType":"string","required":true},
            "entityType": {"dataType":"string","required":true},
            "entityId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "userId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "success": {"dataType":"boolean","required":true},
            "oldData": {"dataType":"union","subSchemas":[{"dataType":"any"},{"dataType":"enum","enums":[null]}],"required":true},
            "newData": {"dataType":"union","subSchemas":[{"dataType":"any"},{"dataType":"enum","enums":[null]}],"required":true},
            "metadata": {"dataType":"union","subSchemas":[{"dataType":"any"},{"dataType":"enum","enums":[null]}],"required":true},
            "ipAddress": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "userAgent": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "requestId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_AuditLog-Array_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"AuditLog"}},{"dataType":"array","array":{"dataType":"array","array":{"dataType":"refObject","ref":"AuditLog"}}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AboutUsValueItem": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "desc": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AboutUsStatItem": {
        "dataType": "refObject",
        "properties": {
            "number": {"dataType":"string","required":true},
            "label": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AboutUsStatus": {
        "dataType": "refEnum",
        "enums": ["published","draft"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AboutUs": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"datetime","required":true},
            "heroTitle": {"dataType":"string","required":true},
            "heroSubtitle": {"dataType":"string","required":true},
            "heroImage": {"dataType":"string"},
            "heroMediaId": {"dataType":"string"},
            "storyTitle": {"dataType":"string","required":true},
            "storyContent": {"dataType":"string","required":true},
            "storyImage": {"dataType":"string"},
            "storyMediaId": {"dataType":"string"},
            "mission": {"dataType":"string","required":true},
            "vision": {"dataType":"string","required":true},
            "values": {"dataType":"array","array":{"dataType":"refObject","ref":"AboutUsValueItem"},"required":true},
            "stats": {"dataType":"array","array":{"dataType":"refObject","ref":"AboutUsStatItem"},"required":true},
            "status": {"ref":"AboutUsStatus","required":true},
            "metaTitle": {"dataType":"string","required":true},
            "metaDescription": {"dataType":"string","required":true},
            "metaKeywords": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_AboutUs_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"AboutUs"},{"dataType":"array","array":{"dataType":"refObject","ref":"AboutUs"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AboutUsValueItemDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "desc": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AboutUsStatItemDto": {
        "dataType": "refObject",
        "properties": {
            "number": {"dataType":"string","required":true},
            "label": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateAboutUsDto": {
        "dataType": "refObject",
        "properties": {
            "heroTitle": {"dataType":"string"},
            "heroSubtitle": {"dataType":"string"},
            "heroMediaId": {"dataType":"string"},
            "storyTitle": {"dataType":"string"},
            "storyContent": {"dataType":"string"},
            "storyMediaId": {"dataType":"string"},
            "mission": {"dataType":"string"},
            "vision": {"dataType":"string"},
            "values": {"dataType":"array","array":{"dataType":"refObject","ref":"AboutUsValueItemDto"}},
            "stats": {"dataType":"array","array":{"dataType":"refObject","ref":"AboutUsStatItemDto"}},
            "status": {"ref":"AboutUsStatus"},
            "metaTitle": {"dataType":"string"},
            "metaDescription": {"dataType":"string"},
            "metaKeywords": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicAboutUsDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "heroTitle": {"dataType":"string"},
            "heroSubtitle": {"dataType":"string"},
            "heroImage": {"dataType":"string"},
            "storyTitle": {"dataType":"string"},
            "storyContent": {"dataType":"string"},
            "storyImage": {"dataType":"string"},
            "mission": {"dataType":"string"},
            "vision": {"dataType":"string"},
            "values": {"dataType":"array","array":{"dataType":"any"}},
            "stats": {"dataType":"array","array":{"dataType":"any"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_PublicAboutUsDto_": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"PublicAboutUsDto"},{"dataType":"array","array":{"dataType":"refObject","ref":"PublicAboutUsDto"}},{"dataType":"enum","enums":[null]}],"required":true},
            "pagination": {"ref":"PaginationMeta"},
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router,opts?:{multer?:ReturnType<typeof multer>}) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################

    const upload = opts?.multer ||  multer({"limits":{"fileSize":8388608}});

    
        const argsTrekkingController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                category: {"in":"query","name":"category","dataType":"string"},
                categorySlug: {"in":"query","name":"categorySlug","dataType":"string"},
                categoryId: {"in":"query","name":"categoryId","dataType":"string"},
                region: {"in":"query","name":"region","dataType":"string"},
                difficulty: {"in":"query","name":"difficulty","ref":"TripDifficulty"},
                status: {"in":"query","name":"status","ref":"TrekStatus"},
                search: {"in":"query","name":"search","dataType":"string"},
                minPrice: {"in":"query","name":"minPrice","dataType":"double"},
                maxPrice: {"in":"query","name":"maxPrice","dataType":"double"},
                minDuration: {"in":"query","name":"minDuration","dataType":"double"},
                maxDuration: {"in":"query","name":"maxDuration","dataType":"double"},
                minAltitude: {"in":"query","name":"minAltitude","dataType":"double"},
                maxAltitude: {"in":"query","name":"maxAltitude","dataType":"double"},
                sortBy: {"in":"query","name":"sortBy","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
        };
        app.get('/treks',
            ...(fetchMiddlewares<RequestHandler>(TrekkingController)),
            ...(fetchMiddlewares<RequestHandler>(TrekkingController.prototype.getAll)),

            async function TrekkingController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTrekkingController_getAll, request, response });

                const controller = new TrekkingController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTrekkingController_getFilterOptions: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/treks/filter-options',
            ...(fetchMiddlewares<RequestHandler>(TrekkingController)),
            ...(fetchMiddlewares<RequestHandler>(TrekkingController.prototype.getFilterOptions)),

            async function TrekkingController_getFilterOptions(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTrekkingController_getFilterOptions, request, response });

                const controller = new TrekkingController();

              await templateService.apiHandler({
                methodName: 'getFilterOptions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTrekkingController_getByIdOrSlug: Record<string, TsoaRoute.ParameterSchema> = {
                idOrSlug: {"in":"path","name":"idOrSlug","required":true,"dataType":"string"},
        };
        app.get('/treks/:idOrSlug',
            ...(fetchMiddlewares<RequestHandler>(TrekkingController)),
            ...(fetchMiddlewares<RequestHandler>(TrekkingController.prototype.getByIdOrSlug)),

            async function TrekkingController_getByIdOrSlug(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTrekkingController_getByIdOrSlug, request, response });

                const controller = new TrekkingController();

              await templateService.apiHandler({
                methodName: 'getByIdOrSlug',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTourController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                category: {"in":"query","name":"category","dataType":"string"},
                categorySlug: {"in":"query","name":"categorySlug","dataType":"string"},
                categoryId: {"in":"query","name":"categoryId","dataType":"string"},
                region: {"in":"query","name":"region","dataType":"string"},
                tourType: {"in":"query","name":"tourType","ref":"TourType"},
                difficulty: {"in":"query","name":"difficulty","ref":"TripDifficulty"},
                status: {"in":"query","name":"status","ref":"TourStatus"},
                search: {"in":"query","name":"search","dataType":"string"},
                minPrice: {"in":"query","name":"minPrice","dataType":"double"},
                maxPrice: {"in":"query","name":"maxPrice","dataType":"double"},
                minDuration: {"in":"query","name":"minDuration","dataType":"double"},
                maxDuration: {"in":"query","name":"maxDuration","dataType":"double"},
                sortBy: {"in":"query","name":"sortBy","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
        };
        app.get('/tours',
            ...(fetchMiddlewares<RequestHandler>(TourController)),
            ...(fetchMiddlewares<RequestHandler>(TourController.prototype.getAll)),

            async function TourController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTourController_getAll, request, response });

                const controller = new TourController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTourController_getFilterOptions: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/tours/filter-options',
            ...(fetchMiddlewares<RequestHandler>(TourController)),
            ...(fetchMiddlewares<RequestHandler>(TourController.prototype.getFilterOptions)),

            async function TourController_getFilterOptions(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTourController_getFilterOptions, request, response });

                const controller = new TourController();

              await templateService.apiHandler({
                methodName: 'getFilterOptions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTourController_getByIdOrSlug: Record<string, TsoaRoute.ParameterSchema> = {
                idOrSlug: {"in":"path","name":"idOrSlug","required":true,"dataType":"string"},
        };
        app.get('/tours/:idOrSlug',
            ...(fetchMiddlewares<RequestHandler>(TourController)),
            ...(fetchMiddlewares<RequestHandler>(TourController.prototype.getByIdOrSlug)),

            async function TourController_getByIdOrSlug(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTourController_getByIdOrSlug, request, response });

                const controller = new TourController();

              await templateService.apiHandler({
                methodName: 'getByIdOrSlug',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTestimonialController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                search: {"in":"query","name":"search","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
                sortBy: {"in":"query","name":"sortBy","dataType":"string"},
                sortOrder: {"in":"query","name":"sortOrder","dataType":"union","subSchemas":[{"dataType":"enum","enums":["ASC"]},{"dataType":"enum","enums":["DESC"]},{"dataType":"enum","enums":["asc"]},{"dataType":"enum","enums":["desc"]}]},
        };
        app.get('/testimonials',
            ...(fetchMiddlewares<RequestHandler>(TestimonialController)),
            ...(fetchMiddlewares<RequestHandler>(TestimonialController.prototype.getAll)),

            async function TestimonialController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTestimonialController_getAll, request, response });

                const controller = new TestimonialController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTestimonialController_getById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/testimonials/:id',
            ...(fetchMiddlewares<RequestHandler>(TestimonialController)),
            ...(fetchMiddlewares<RequestHandler>(TestimonialController.prototype.getById)),

            async function TestimonialController_getById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTestimonialController_getById, request, response });

                const controller = new TestimonialController();

              await templateService.apiHandler({
                methodName: 'getById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTeamController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                search: {"in":"query","name":"search","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
                sortBy: {"in":"query","name":"sortBy","dataType":"string"},
                sortOrder: {"in":"query","name":"sortOrder","dataType":"union","subSchemas":[{"dataType":"enum","enums":["ASC"]},{"dataType":"enum","enums":["DESC"]},{"dataType":"enum","enums":["asc"]},{"dataType":"enum","enums":["desc"]}]},
        };
        app.get('/teams',
            ...(fetchMiddlewares<RequestHandler>(TeamController)),
            ...(fetchMiddlewares<RequestHandler>(TeamController.prototype.getAll)),

            async function TeamController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTeamController_getAll, request, response });

                const controller = new TeamController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTeamController_getById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/teams/:id',
            ...(fetchMiddlewares<RequestHandler>(TeamController)),
            ...(fetchMiddlewares<RequestHandler>(TeamController.prototype.getById)),

            async function TeamController_getById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTeamController_getById, request, response });

                const controller = new TeamController();

              await templateService.apiHandler({
                methodName: 'getById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSettingController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/settings',
            ...(fetchMiddlewares<RequestHandler>(SettingController)),
            ...(fetchMiddlewares<RequestHandler>(SettingController.prototype.getAll)),

            async function SettingController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSettingController_getAll, request, response });

                const controller = new SettingController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsNotificationController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","dataType":"double"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                isRead: {"in":"query","name":"isRead","dataType":"boolean"},
        };
        app.get('/notifications',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(NotificationController)),
            ...(fetchMiddlewares<RequestHandler>(NotificationController.prototype.getAll)),

            async function NotificationController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsNotificationController_getAll, request, response });

                const controller = new NotificationController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsNotificationController_getPaged: Record<string, TsoaRoute.ParameterSchema> = {
                limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
                offset: {"default":0,"in":"query","name":"offset","dataType":"double"},
        };
        app.get('/notifications/paged',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(NotificationController)),
            ...(fetchMiddlewares<RequestHandler>(NotificationController.prototype.getPaged)),

            async function NotificationController_getPaged(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsNotificationController_getPaged, request, response });

                const controller = new NotificationController();

              await templateService.apiHandler({
                methodName: 'getPaged',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsNotificationController_getUnreadCount: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/notifications/unread-count',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(NotificationController)),
            ...(fetchMiddlewares<RequestHandler>(NotificationController.prototype.getUnreadCount)),

            async function NotificationController_getUnreadCount(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsNotificationController_getUnreadCount, request, response });

                const controller = new NotificationController();

              await templateService.apiHandler({
                methodName: 'getUnreadCount',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsNotificationController_markAllRead: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.put('/notifications/read-all',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(NotificationController)),
            ...(fetchMiddlewares<RequestHandler>(NotificationController.prototype.markAllRead)),

            async function NotificationController_markAllRead(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsNotificationController_markAllRead, request, response });

                const controller = new NotificationController();

              await templateService.apiHandler({
                methodName: 'markAllRead',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsNotificationController_markRead: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.put('/notifications/:id/read',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(NotificationController)),
            ...(fetchMiddlewares<RequestHandler>(NotificationController.prototype.markRead)),

            async function NotificationController_markRead(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsNotificationController_markRead, request, response });

                const controller = new NotificationController();

              await templateService.apiHandler({
                methodName: 'markRead',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsNotificationController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/notifications/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(NotificationController)),
            ...(fetchMiddlewares<RequestHandler>(NotificationController.prototype.delete)),

            async function NotificationController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsNotificationController_delete, request, response });

                const controller = new NotificationController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMediaController_uploadFile: Record<string, TsoaRoute.ParameterSchema> = {
                file: {"in":"formData","name":"file","required":true,"dataType":"file"},
                categoryId: {"in":"query","name":"categoryId","dataType":"string"},
        };
        app.post('/media/upload',
            authenticateMiddleware([{"jwt":["admin"]}]),
            upload.fields([
                {
                    name: "file",
                    maxCount: 1
                }
            ]),
            ...(fetchMiddlewares<RequestHandler>(MediaController)),
            ...(fetchMiddlewares<RequestHandler>(MediaController.prototype.uploadFile)),

            async function MediaController_uploadFile(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMediaController_uploadFile, request, response });

                const controller = new MediaController();

              await templateService.apiHandler({
                methodName: 'uploadFile',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMediaController_getAllMedia: Record<string, TsoaRoute.ParameterSchema> = {
                categoryId: {"in":"query","name":"categoryId","dataType":"string"},
                category: {"in":"query","name":"category","dataType":"string"},
                search: {"in":"query","name":"search","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
        };
        app.get('/media',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(MediaController)),
            ...(fetchMiddlewares<RequestHandler>(MediaController.prototype.getAllMedia)),

            async function MediaController_getAllMedia(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMediaController_getAllMedia, request, response });

                const controller = new MediaController();

              await templateService.apiHandler({
                methodName: 'getAllMedia',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMediaController_updateMedia: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateMediaDto"},
        };
        app.put('/media/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(MediaController)),
            ...(fetchMiddlewares<RequestHandler>(MediaController.prototype.updateMedia)),

            async function MediaController_updateMedia(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMediaController_updateMedia, request, response });

                const controller = new MediaController();

              await templateService.apiHandler({
                methodName: 'updateMedia',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMediaController_deleteMedia: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/media/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(MediaController)),
            ...(fetchMiddlewares<RequestHandler>(MediaController.prototype.deleteMedia)),

            async function MediaController_deleteMedia(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMediaController_deleteMedia, request, response });

                const controller = new MediaController();

              await templateService.apiHandler({
                methodName: 'deleteMedia',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInquiryController_create: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateInquiryDto"},
        };
        app.post('/inquiries',
            ...(fetchMiddlewares<RequestHandler>(InquiryController)),
            ...(fetchMiddlewares<RequestHandler>(InquiryController.prototype.create)),

            async function InquiryController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInquiryController_create, request, response });

                const controller = new InquiryController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsFaqController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                category: {"in":"query","name":"category","dataType":"string"},
                search: {"in":"query","name":"search","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
                sortBy: {"in":"query","name":"sortBy","dataType":"string"},
                sortOrder: {"in":"query","name":"sortOrder","dataType":"union","subSchemas":[{"dataType":"enum","enums":["ASC"]},{"dataType":"enum","enums":["DESC"]},{"dataType":"enum","enums":["asc"]},{"dataType":"enum","enums":["desc"]}]},
        };
        app.get('/faqs',
            ...(fetchMiddlewares<RequestHandler>(FaqController)),
            ...(fetchMiddlewares<RequestHandler>(FaqController.prototype.getAll)),

            async function FaqController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFaqController_getAll, request, response });

                const controller = new FaqController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsFaqController_getById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/faqs/:id',
            ...(fetchMiddlewares<RequestHandler>(FaqController)),
            ...(fetchMiddlewares<RequestHandler>(FaqController.prototype.getById)),

            async function FaqController_getById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFaqController_getById, request, response });

                const controller = new FaqController();

              await templateService.apiHandler({
                methodName: 'getById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsExpeditionController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                category: {"in":"query","name":"category","dataType":"string"},
                categorySlug: {"in":"query","name":"categorySlug","dataType":"string"},
                categoryId: {"in":"query","name":"categoryId","dataType":"string"},
                region: {"in":"query","name":"region","dataType":"string"},
                difficulty: {"in":"query","name":"difficulty","ref":"TripDifficulty"},
                climbingGrade: {"in":"query","name":"climbingGrade","ref":"ClimbingGrade"},
                status: {"in":"query","name":"status","ref":"ExpeditionStatus"},
                search: {"in":"query","name":"search","dataType":"string"},
                minPrice: {"in":"query","name":"minPrice","dataType":"double"},
                maxPrice: {"in":"query","name":"maxPrice","dataType":"double"},
                minAltitude: {"in":"query","name":"minAltitude","dataType":"double"},
                maxAltitude: {"in":"query","name":"maxAltitude","dataType":"double"},
                minPeakHeight: {"in":"query","name":"minPeakHeight","dataType":"double"},
                maxPeakHeight: {"in":"query","name":"maxPeakHeight","dataType":"double"},
                sortBy: {"in":"query","name":"sortBy","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
        };
        app.get('/expeditions',
            ...(fetchMiddlewares<RequestHandler>(ExpeditionController)),
            ...(fetchMiddlewares<RequestHandler>(ExpeditionController.prototype.getAll)),

            async function ExpeditionController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsExpeditionController_getAll, request, response });

                const controller = new ExpeditionController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsExpeditionController_getFilterOptions: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/expeditions/filter-options',
            ...(fetchMiddlewares<RequestHandler>(ExpeditionController)),
            ...(fetchMiddlewares<RequestHandler>(ExpeditionController.prototype.getFilterOptions)),

            async function ExpeditionController_getFilterOptions(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsExpeditionController_getFilterOptions, request, response });

                const controller = new ExpeditionController();

              await templateService.apiHandler({
                methodName: 'getFilterOptions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsExpeditionController_getByIdOrSlug: Record<string, TsoaRoute.ParameterSchema> = {
                idOrSlug: {"in":"path","name":"idOrSlug","required":true,"dataType":"string"},
        };
        app.get('/expeditions/:idOrSlug',
            ...(fetchMiddlewares<RequestHandler>(ExpeditionController)),
            ...(fetchMiddlewares<RequestHandler>(ExpeditionController.prototype.getByIdOrSlug)),

            async function ExpeditionController_getByIdOrSlug(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsExpeditionController_getByIdOrSlug, request, response });

                const controller = new ExpeditionController();

              await templateService.apiHandler({
                methodName: 'getByIdOrSlug',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDashboardController_getMetrics: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/admin/dashboard',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(DashboardController)),
            ...(fetchMiddlewares<RequestHandler>(DashboardController.prototype.getMetrics)),

            async function DashboardController_getMetrics(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDashboardController_getMetrics, request, response });

                const controller = new DashboardController();

              await templateService.apiHandler({
                methodName: 'getMetrics',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoryController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                type: {"in":"query","name":"type","ref":"CategoryType"},
                parentsOnly: {"in":"query","name":"parentsOnly","dataType":"boolean"},
                parentId: {"in":"query","name":"parentId","dataType":"string"},
                search: {"in":"query","name":"search","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
                showInMenu: {"in":"query","name":"showInMenu","dataType":"boolean"},
        };
        app.get('/categories',
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.getAll)),

            async function CategoryController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_getAll, request, response });

                const controller = new CategoryController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoryController_getNavMenu: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/categories/nav',
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.getNavMenu)),

            async function CategoryController_getNavMenu(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_getNavMenu, request, response });

                const controller = new CategoryController();

              await templateService.apiHandler({
                methodName: 'getNavMenu',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoryController_getByIdOrSlug: Record<string, TsoaRoute.ParameterSchema> = {
                idOrSlug: {"in":"path","name":"idOrSlug","required":true,"dataType":"string"},
        };
        app.get('/categories/:idOrSlug',
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.getByIdOrSlug)),

            async function CategoryController_getByIdOrSlug(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_getByIdOrSlug, request, response });

                const controller = new CategoryController();

              await templateService.apiHandler({
                methodName: 'getByIdOrSlug',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBookingController_create: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateBookingDto"},
        };
        app.post('/bookings',
            ...(fetchMiddlewares<RequestHandler>(BookingController)),
            ...(fetchMiddlewares<RequestHandler>(BookingController.prototype.create)),

            async function BookingController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBookingController_create, request, response });

                const controller = new BookingController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBlogController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                status: {"in":"query","name":"status","ref":"BlogStatus"},
                categoryId: {"in":"query","name":"categoryId","dataType":"string"},
                category: {"in":"query","name":"category","dataType":"string"},
                search: {"in":"query","name":"search","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
        };
        app.get('/blogs',
            ...(fetchMiddlewares<RequestHandler>(BlogController)),
            ...(fetchMiddlewares<RequestHandler>(BlogController.prototype.getAll)),

            async function BlogController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBlogController_getAll, request, response });

                const controller = new BlogController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBlogController_getByIdOrSlug: Record<string, TsoaRoute.ParameterSchema> = {
                idOrSlug: {"in":"path","name":"idOrSlug","required":true,"dataType":"string"},
        };
        app.get('/blogs/:idOrSlug',
            ...(fetchMiddlewares<RequestHandler>(BlogController)),
            ...(fetchMiddlewares<RequestHandler>(BlogController.prototype.getByIdOrSlug)),

            async function BlogController_getByIdOrSlug(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBlogController_getByIdOrSlug, request, response });

                const controller = new BlogController();

              await templateService.apiHandler({
                methodName: 'getByIdOrSlug',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminAuthController_login: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"AdminAuthSchema"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/admin/auth/login',
            ...(fetchMiddlewares<RequestHandler>(AdminAuthController)),
            ...(fetchMiddlewares<RequestHandler>(AdminAuthController.prototype.login)),

            async function AdminAuthController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminAuthController_login, request, response });

                const controller = new AdminAuthController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminAuthController_getCurrentUser: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/admin/auth/me',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminAuthController)),
            ...(fetchMiddlewares<RequestHandler>(AdminAuthController.prototype.getCurrentUser)),

            async function AdminAuthController_getCurrentUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminAuthController_getCurrentUser, request, response });

                const controller = new AdminAuthController();

              await templateService.apiHandler({
                methodName: 'getCurrentUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminAuthController_logout: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/admin/auth/logout',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminAuthController)),
            ...(fetchMiddlewares<RequestHandler>(AdminAuthController.prototype.logout)),

            async function AdminAuthController_logout(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminAuthController_logout, request, response });

                const controller = new AdminAuthController();

              await templateService.apiHandler({
                methodName: 'logout',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTrekkingController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                categoryId: {"in":"query","name":"categoryId","dataType":"string"},
                region: {"in":"query","name":"region","dataType":"string"},
                difficulty: {"in":"query","name":"difficulty","ref":"TripDifficulty"},
                status: {"in":"query","name":"status","ref":"TrekStatus"},
                search: {"in":"query","name":"search","dataType":"string"},
                minPrice: {"in":"query","name":"minPrice","dataType":"double"},
                maxPrice: {"in":"query","name":"maxPrice","dataType":"double"},
                minDuration: {"in":"query","name":"minDuration","dataType":"double"},
                maxDuration: {"in":"query","name":"maxDuration","dataType":"double"},
                minAltitude: {"in":"query","name":"minAltitude","dataType":"double"},
                maxAltitude: {"in":"query","name":"maxAltitude","dataType":"double"},
                sortBy: {"in":"query","name":"sortBy","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
        };
        app.get('/admin/treks',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTrekkingController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTrekkingController.prototype.getAll)),

            async function AdminTrekkingController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTrekkingController_getAll, request, response });

                const controller = new AdminTrekkingController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTrekkingController_getByIdOrSlug: Record<string, TsoaRoute.ParameterSchema> = {
                idOrSlug: {"in":"path","name":"idOrSlug","required":true,"dataType":"string"},
        };
        app.get('/admin/treks/:idOrSlug',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTrekkingController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTrekkingController.prototype.getByIdOrSlug)),

            async function AdminTrekkingController_getByIdOrSlug(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTrekkingController_getByIdOrSlug, request, response });

                const controller = new AdminTrekkingController();

              await templateService.apiHandler({
                methodName: 'getByIdOrSlug',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTrekkingController_create: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateTrekDto"},
        };
        app.post('/admin/treks',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTrekkingController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTrekkingController.prototype.create)),

            async function AdminTrekkingController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTrekkingController_create, request, response });

                const controller = new AdminTrekkingController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTrekkingController_update: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateTrekDto"},
        };
        app.put('/admin/treks/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTrekkingController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTrekkingController.prototype.update)),

            async function AdminTrekkingController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTrekkingController_update, request, response });

                const controller = new AdminTrekkingController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTrekkingController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/admin/treks/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTrekkingController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTrekkingController.prototype.delete)),

            async function AdminTrekkingController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTrekkingController_delete, request, response });

                const controller = new AdminTrekkingController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTourController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                categoryId: {"in":"query","name":"categoryId","dataType":"string"},
                region: {"in":"query","name":"region","dataType":"string"},
                tourType: {"in":"query","name":"tourType","ref":"TourType"},
                difficulty: {"in":"query","name":"difficulty","ref":"TripDifficulty"},
                status: {"in":"query","name":"status","ref":"TourStatus"},
                search: {"in":"query","name":"search","dataType":"string"},
                minPrice: {"in":"query","name":"minPrice","dataType":"double"},
                maxPrice: {"in":"query","name":"maxPrice","dataType":"double"},
                minDuration: {"in":"query","name":"minDuration","dataType":"double"},
                maxDuration: {"in":"query","name":"maxDuration","dataType":"double"},
                sortBy: {"in":"query","name":"sortBy","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
        };
        app.get('/admin/tours',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTourController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTourController.prototype.getAll)),

            async function AdminTourController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTourController_getAll, request, response });

                const controller = new AdminTourController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTourController_getByIdOrSlug: Record<string, TsoaRoute.ParameterSchema> = {
                idOrSlug: {"in":"path","name":"idOrSlug","required":true,"dataType":"string"},
        };
        app.get('/admin/tours/:idOrSlug',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTourController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTourController.prototype.getByIdOrSlug)),

            async function AdminTourController_getByIdOrSlug(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTourController_getByIdOrSlug, request, response });

                const controller = new AdminTourController();

              await templateService.apiHandler({
                methodName: 'getByIdOrSlug',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTourController_create: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateTourDto"},
        };
        app.post('/admin/tours',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTourController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTourController.prototype.create)),

            async function AdminTourController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTourController_create, request, response });

                const controller = new AdminTourController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTourController_update: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateTourDto"},
        };
        app.put('/admin/tours/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTourController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTourController.prototype.update)),

            async function AdminTourController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTourController_update, request, response });

                const controller = new AdminTourController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTourController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/admin/tours/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTourController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTourController.prototype.delete)),

            async function AdminTourController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTourController_delete, request, response });

                const controller = new AdminTourController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTestimonialController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                status: {"in":"query","name":"status","ref":"TestimonialStatus"},
                search: {"in":"query","name":"search","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
                sortBy: {"in":"query","name":"sortBy","dataType":"string"},
                sortOrder: {"in":"query","name":"sortOrder","dataType":"union","subSchemas":[{"dataType":"enum","enums":["ASC"]},{"dataType":"enum","enums":["DESC"]},{"dataType":"enum","enums":["asc"]},{"dataType":"enum","enums":["desc"]}]},
        };
        app.get('/admin/testimonials',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTestimonialController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTestimonialController.prototype.getAll)),

            async function AdminTestimonialController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTestimonialController_getAll, request, response });

                const controller = new AdminTestimonialController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTestimonialController_reorder: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"ReorderTestimonialsDto"},
        };
        app.put('/admin/testimonials/reorder',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTestimonialController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTestimonialController.prototype.reorder)),

            async function AdminTestimonialController_reorder(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTestimonialController_reorder, request, response });

                const controller = new AdminTestimonialController();

              await templateService.apiHandler({
                methodName: 'reorder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTestimonialController_getById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/admin/testimonials/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTestimonialController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTestimonialController.prototype.getById)),

            async function AdminTestimonialController_getById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTestimonialController_getById, request, response });

                const controller = new AdminTestimonialController();

              await templateService.apiHandler({
                methodName: 'getById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTestimonialController_create: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateTestimonialDto"},
        };
        app.post('/admin/testimonials',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTestimonialController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTestimonialController.prototype.create)),

            async function AdminTestimonialController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTestimonialController_create, request, response });

                const controller = new AdminTestimonialController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTestimonialController_update: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateTestimonialDto"},
        };
        app.put('/admin/testimonials/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTestimonialController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTestimonialController.prototype.update)),

            async function AdminTestimonialController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTestimonialController_update, request, response });

                const controller = new AdminTestimonialController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTestimonialController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/admin/testimonials/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTestimonialController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTestimonialController.prototype.delete)),

            async function AdminTestimonialController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTestimonialController_delete, request, response });

                const controller = new AdminTestimonialController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTeamController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                status: {"in":"query","name":"status","ref":"TeamMemberStatus"},
                search: {"in":"query","name":"search","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
                sortBy: {"in":"query","name":"sortBy","dataType":"string"},
                sortOrder: {"in":"query","name":"sortOrder","dataType":"union","subSchemas":[{"dataType":"enum","enums":["ASC"]},{"dataType":"enum","enums":["DESC"]},{"dataType":"enum","enums":["asc"]},{"dataType":"enum","enums":["desc"]}]},
        };
        app.get('/admin/teams',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTeamController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTeamController.prototype.getAll)),

            async function AdminTeamController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTeamController_getAll, request, response });

                const controller = new AdminTeamController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTeamController_reorder: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"ReorderTeamMembersDto"},
        };
        app.put('/admin/teams/reorder',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTeamController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTeamController.prototype.reorder)),

            async function AdminTeamController_reorder(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTeamController_reorder, request, response });

                const controller = new AdminTeamController();

              await templateService.apiHandler({
                methodName: 'reorder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTeamController_getById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/admin/teams/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTeamController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTeamController.prototype.getById)),

            async function AdminTeamController_getById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTeamController_getById, request, response });

                const controller = new AdminTeamController();

              await templateService.apiHandler({
                methodName: 'getById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTeamController_create: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateTeamMemberDto"},
        };
        app.post('/admin/teams',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTeamController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTeamController.prototype.create)),

            async function AdminTeamController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTeamController_create, request, response });

                const controller = new AdminTeamController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTeamController_update: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateTeamMemberDto"},
        };
        app.put('/admin/teams/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTeamController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTeamController.prototype.update)),

            async function AdminTeamController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTeamController_update, request, response });

                const controller = new AdminTeamController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminTeamController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/admin/teams/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminTeamController)),
            ...(fetchMiddlewares<RequestHandler>(AdminTeamController.prototype.delete)),

            async function AdminTeamController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminTeamController_delete, request, response });

                const controller = new AdminTeamController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminSettingController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/admin/settings',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminSettingController)),
            ...(fetchMiddlewares<RequestHandler>(AdminSettingController.prototype.getAll)),

            async function AdminSettingController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminSettingController_getAll, request, response });

                const controller = new AdminSettingController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminSettingController_update: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"UpdateSettingsDto"},
        };
        app.put('/admin/settings',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminSettingController)),
            ...(fetchMiddlewares<RequestHandler>(AdminSettingController.prototype.update)),

            async function AdminSettingController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminSettingController_update, request, response });

                const controller = new AdminSettingController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminSearchController_search: Record<string, TsoaRoute.ParameterSchema> = {
                q: {"in":"query","name":"q","required":true,"dataType":"string"},
        };
        app.get('/admin/search',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminSearchController)),
            ...(fetchMiddlewares<RequestHandler>(AdminSearchController.prototype.search)),

            async function AdminSearchController_search(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminSearchController_search, request, response });

                const controller = new AdminSearchController();

              await templateService.apiHandler({
                methodName: 'search',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminMediaController_uploadFile: Record<string, TsoaRoute.ParameterSchema> = {
                file: {"in":"formData","name":"file","required":true,"dataType":"file"},
                categoryId: {"in":"query","name":"categoryId","dataType":"string"},
        };
        app.post('/admin/media/upload',
            authenticateMiddleware([{"jwt":["admin"]}]),
            upload.fields([
                {
                    name: "file",
                    maxCount: 1
                }
            ]),
            ...(fetchMiddlewares<RequestHandler>(AdminMediaController)),
            ...(fetchMiddlewares<RequestHandler>(AdminMediaController.prototype.uploadFile)),

            async function AdminMediaController_uploadFile(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminMediaController_uploadFile, request, response });

                const controller = new AdminMediaController();

              await templateService.apiHandler({
                methodName: 'uploadFile',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminMediaController_getAllMedia: Record<string, TsoaRoute.ParameterSchema> = {
                categoryId: {"in":"query","name":"categoryId","dataType":"string"},
                category: {"in":"query","name":"category","dataType":"string"},
                search: {"in":"query","name":"search","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
        };
        app.get('/admin/media',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminMediaController)),
            ...(fetchMiddlewares<RequestHandler>(AdminMediaController.prototype.getAllMedia)),

            async function AdminMediaController_getAllMedia(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminMediaController_getAllMedia, request, response });

                const controller = new AdminMediaController();

              await templateService.apiHandler({
                methodName: 'getAllMedia',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminMediaController_updateMedia: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateMediaDto"},
        };
        app.put('/admin/media/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminMediaController)),
            ...(fetchMiddlewares<RequestHandler>(AdminMediaController.prototype.updateMedia)),

            async function AdminMediaController_updateMedia(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminMediaController_updateMedia, request, response });

                const controller = new AdminMediaController();

              await templateService.apiHandler({
                methodName: 'updateMedia',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminMediaController_deleteMedia: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/admin/media/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminMediaController)),
            ...(fetchMiddlewares<RequestHandler>(AdminMediaController.prototype.deleteMedia)),

            async function AdminMediaController_deleteMedia(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminMediaController_deleteMedia, request, response });

                const controller = new AdminMediaController();

              await templateService.apiHandler({
                methodName: 'deleteMedia',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminInquiryController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                status: {"in":"query","name":"status","ref":"InquiryStatus"},
                search: {"in":"query","name":"search","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
        };
        app.get('/admin/inquiries',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminInquiryController)),
            ...(fetchMiddlewares<RequestHandler>(AdminInquiryController.prototype.getAll)),

            async function AdminInquiryController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminInquiryController_getAll, request, response });

                const controller = new AdminInquiryController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminInquiryController_getById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/admin/inquiries/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminInquiryController)),
            ...(fetchMiddlewares<RequestHandler>(AdminInquiryController.prototype.getById)),

            async function AdminInquiryController_getById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminInquiryController_getById, request, response });

                const controller = new AdminInquiryController();

              await templateService.apiHandler({
                methodName: 'getById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminInquiryController_update: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateInquiryDto"},
        };
        app.put('/admin/inquiries/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminInquiryController)),
            ...(fetchMiddlewares<RequestHandler>(AdminInquiryController.prototype.update)),

            async function AdminInquiryController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminInquiryController_update, request, response });

                const controller = new AdminInquiryController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminInquiryController_sendQuote: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"dataType":"intersection","subSchemas":[{"ref":"SendQuoteDto"},{"dataType":"nestedObjectLiteral","nestedProperties":{"status":{"ref":"InquiryStatus"}}}]},
        };
        app.post('/admin/inquiries/:id/quote',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminInquiryController)),
            ...(fetchMiddlewares<RequestHandler>(AdminInquiryController.prototype.sendQuote)),

            async function AdminInquiryController_sendQuote(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminInquiryController_sendQuote, request, response });

                const controller = new AdminInquiryController();

              await templateService.apiHandler({
                methodName: 'sendQuote',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminInquiryController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/admin/inquiries/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminInquiryController)),
            ...(fetchMiddlewares<RequestHandler>(AdminInquiryController.prototype.delete)),

            async function AdminInquiryController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminInquiryController_delete, request, response });

                const controller = new AdminInquiryController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminFaqController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                status: {"in":"query","name":"status","ref":"FaqStatus"},
                category: {"in":"query","name":"category","dataType":"string"},
                search: {"in":"query","name":"search","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
                sortBy: {"in":"query","name":"sortBy","dataType":"string"},
                sortOrder: {"in":"query","name":"sortOrder","dataType":"union","subSchemas":[{"dataType":"enum","enums":["ASC"]},{"dataType":"enum","enums":["DESC"]},{"dataType":"enum","enums":["asc"]},{"dataType":"enum","enums":["desc"]}]},
        };
        app.get('/admin/faqs',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminFaqController)),
            ...(fetchMiddlewares<RequestHandler>(AdminFaqController.prototype.getAll)),

            async function AdminFaqController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminFaqController_getAll, request, response });

                const controller = new AdminFaqController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminFaqController_reorder: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"ReorderFaqsDto"},
        };
        app.put('/admin/faqs/reorder',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminFaqController)),
            ...(fetchMiddlewares<RequestHandler>(AdminFaqController.prototype.reorder)),

            async function AdminFaqController_reorder(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminFaqController_reorder, request, response });

                const controller = new AdminFaqController();

              await templateService.apiHandler({
                methodName: 'reorder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminFaqController_getById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/admin/faqs/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminFaqController)),
            ...(fetchMiddlewares<RequestHandler>(AdminFaqController.prototype.getById)),

            async function AdminFaqController_getById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminFaqController_getById, request, response });

                const controller = new AdminFaqController();

              await templateService.apiHandler({
                methodName: 'getById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminFaqController_create: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateFaqDto"},
        };
        app.post('/admin/faqs',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminFaqController)),
            ...(fetchMiddlewares<RequestHandler>(AdminFaqController.prototype.create)),

            async function AdminFaqController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminFaqController_create, request, response });

                const controller = new AdminFaqController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminFaqController_update: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateFaqDto"},
        };
        app.put('/admin/faqs/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminFaqController)),
            ...(fetchMiddlewares<RequestHandler>(AdminFaqController.prototype.update)),

            async function AdminFaqController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminFaqController_update, request, response });

                const controller = new AdminFaqController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminFaqController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/admin/faqs/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminFaqController)),
            ...(fetchMiddlewares<RequestHandler>(AdminFaqController.prototype.delete)),

            async function AdminFaqController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminFaqController_delete, request, response });

                const controller = new AdminFaqController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminExpeditionController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                categoryId: {"in":"query","name":"categoryId","dataType":"string"},
                region: {"in":"query","name":"region","dataType":"string"},
                difficulty: {"in":"query","name":"difficulty","ref":"TripDifficulty"},
                climbingGrade: {"in":"query","name":"climbingGrade","ref":"ClimbingGrade"},
                status: {"in":"query","name":"status","ref":"ExpeditionStatus"},
                search: {"in":"query","name":"search","dataType":"string"},
                minPrice: {"in":"query","name":"minPrice","dataType":"double"},
                maxPrice: {"in":"query","name":"maxPrice","dataType":"double"},
                minAltitude: {"in":"query","name":"minAltitude","dataType":"double"},
                maxAltitude: {"in":"query","name":"maxAltitude","dataType":"double"},
                minPeakHeight: {"in":"query","name":"minPeakHeight","dataType":"double"},
                maxPeakHeight: {"in":"query","name":"maxPeakHeight","dataType":"double"},
                sortBy: {"in":"query","name":"sortBy","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
        };
        app.get('/admin/expeditions',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminExpeditionController)),
            ...(fetchMiddlewares<RequestHandler>(AdminExpeditionController.prototype.getAll)),

            async function AdminExpeditionController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminExpeditionController_getAll, request, response });

                const controller = new AdminExpeditionController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminExpeditionController_getByIdOrSlug: Record<string, TsoaRoute.ParameterSchema> = {
                idOrSlug: {"in":"path","name":"idOrSlug","required":true,"dataType":"string"},
        };
        app.get('/admin/expeditions/:idOrSlug',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminExpeditionController)),
            ...(fetchMiddlewares<RequestHandler>(AdminExpeditionController.prototype.getByIdOrSlug)),

            async function AdminExpeditionController_getByIdOrSlug(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminExpeditionController_getByIdOrSlug, request, response });

                const controller = new AdminExpeditionController();

              await templateService.apiHandler({
                methodName: 'getByIdOrSlug',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminExpeditionController_create: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateExpeditionDto"},
        };
        app.post('/admin/expeditions',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminExpeditionController)),
            ...(fetchMiddlewares<RequestHandler>(AdminExpeditionController.prototype.create)),

            async function AdminExpeditionController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminExpeditionController_create, request, response });

                const controller = new AdminExpeditionController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminExpeditionController_update: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateExpeditionDto"},
        };
        app.put('/admin/expeditions/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminExpeditionController)),
            ...(fetchMiddlewares<RequestHandler>(AdminExpeditionController.prototype.update)),

            async function AdminExpeditionController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminExpeditionController_update, request, response });

                const controller = new AdminExpeditionController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminExpeditionController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/admin/expeditions/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminExpeditionController)),
            ...(fetchMiddlewares<RequestHandler>(AdminExpeditionController.prototype.delete)),

            async function AdminExpeditionController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminExpeditionController_delete, request, response });

                const controller = new AdminExpeditionController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminCategoryController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                status: {"in":"query","name":"status","ref":"CategoryStatus"},
                type: {"in":"query","name":"type","ref":"CategoryType"},
                search: {"in":"query","name":"search","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
                parentId: {"in":"query","name":"parentId","dataType":"string"},
                parentsOnly: {"in":"query","name":"parentsOnly","dataType":"boolean"},
                showInMenu: {"in":"query","name":"showInMenu","dataType":"boolean"},
        };
        app.get('/admin/categories',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminCategoryController)),
            ...(fetchMiddlewares<RequestHandler>(AdminCategoryController.prototype.getAll)),

            async function AdminCategoryController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminCategoryController_getAll, request, response });

                const controller = new AdminCategoryController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminCategoryController_getMenuStructure: Record<string, TsoaRoute.ParameterSchema> = {
                domain: {"in":"query","name":"domain","required":true,"ref":"CategoryType"},
        };
        app.get('/admin/categories/menu-structure',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminCategoryController)),
            ...(fetchMiddlewares<RequestHandler>(AdminCategoryController.prototype.getMenuStructure)),

            async function AdminCategoryController_getMenuStructure(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminCategoryController_getMenuStructure, request, response });

                const controller = new AdminCategoryController();

              await templateService.apiHandler({
                methodName: 'getMenuStructure',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminCategoryController_getByIdOrSlug: Record<string, TsoaRoute.ParameterSchema> = {
                idOrSlug: {"in":"path","name":"idOrSlug","required":true,"dataType":"string"},
        };
        app.get('/admin/categories/:idOrSlug',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminCategoryController)),
            ...(fetchMiddlewares<RequestHandler>(AdminCategoryController.prototype.getByIdOrSlug)),

            async function AdminCategoryController_getByIdOrSlug(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminCategoryController_getByIdOrSlug, request, response });

                const controller = new AdminCategoryController();

              await templateService.apiHandler({
                methodName: 'getByIdOrSlug',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminCategoryController_create: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateCategoryDto"},
        };
        app.post('/admin/categories',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminCategoryController)),
            ...(fetchMiddlewares<RequestHandler>(AdminCategoryController.prototype.create)),

            async function AdminCategoryController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminCategoryController_create, request, response });

                const controller = new AdminCategoryController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminCategoryController_reorder: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"items":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"menuOrder":{"dataType":"double","required":true},"id":{"dataType":"string","required":true}}},"required":true},"domain":{"ref":"CategoryType"}}},
        };
        app.put('/admin/categories/reorder',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminCategoryController)),
            ...(fetchMiddlewares<RequestHandler>(AdminCategoryController.prototype.reorder)),

            async function AdminCategoryController_reorder(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminCategoryController_reorder, request, response });

                const controller = new AdminCategoryController();

              await templateService.apiHandler({
                methodName: 'reorder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminCategoryController_update: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateCategoryDto"},
        };
        app.put('/admin/categories/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminCategoryController)),
            ...(fetchMiddlewares<RequestHandler>(AdminCategoryController.prototype.update)),

            async function AdminCategoryController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminCategoryController_update, request, response });

                const controller = new AdminCategoryController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminCategoryController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/admin/categories/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminCategoryController)),
            ...(fetchMiddlewares<RequestHandler>(AdminCategoryController.prototype.delete)),

            async function AdminCategoryController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminCategoryController_delete, request, response });

                const controller = new AdminCategoryController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminBookingController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                search: {"in":"query","name":"search","dataType":"string"},
                status: {"in":"query","name":"status","ref":"BookingStatus"},
                packageType: {"in":"query","name":"packageType","ref":"BookingPackageType"},
                paymentStatus: {"in":"query","name":"paymentStatus","ref":"BookingPaymentStatus"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
        };
        app.get('/admin/bookings',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminBookingController)),
            ...(fetchMiddlewares<RequestHandler>(AdminBookingController.prototype.getAll)),

            async function AdminBookingController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminBookingController_getAll, request, response });

                const controller = new AdminBookingController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminBookingController_getById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/admin/bookings/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminBookingController)),
            ...(fetchMiddlewares<RequestHandler>(AdminBookingController.prototype.getById)),

            async function AdminBookingController_getById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminBookingController_getById, request, response });

                const controller = new AdminBookingController();

              await templateService.apiHandler({
                methodName: 'getById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminBookingController_update: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateBookingDto"},
        };
        app.put('/admin/bookings/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminBookingController)),
            ...(fetchMiddlewares<RequestHandler>(AdminBookingController.prototype.update)),

            async function AdminBookingController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminBookingController_update, request, response });

                const controller = new AdminBookingController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminBookingController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/admin/bookings/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminBookingController)),
            ...(fetchMiddlewares<RequestHandler>(AdminBookingController.prototype.delete)),

            async function AdminBookingController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminBookingController_delete, request, response });

                const controller = new AdminBookingController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminBlogController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                status: {"in":"query","name":"status","ref":"BlogStatus"},
                categoryId: {"in":"query","name":"categoryId","dataType":"string"},
                category: {"in":"query","name":"category","dataType":"string"},
                search: {"in":"query","name":"search","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
        };
        app.get('/admin/blogs',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminBlogController)),
            ...(fetchMiddlewares<RequestHandler>(AdminBlogController.prototype.getAll)),

            async function AdminBlogController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminBlogController_getAll, request, response });

                const controller = new AdminBlogController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminBlogController_getByIdOrSlug: Record<string, TsoaRoute.ParameterSchema> = {
                idOrSlug: {"in":"path","name":"idOrSlug","required":true,"dataType":"string"},
        };
        app.get('/admin/blogs/:idOrSlug',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminBlogController)),
            ...(fetchMiddlewares<RequestHandler>(AdminBlogController.prototype.getByIdOrSlug)),

            async function AdminBlogController_getByIdOrSlug(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminBlogController_getByIdOrSlug, request, response });

                const controller = new AdminBlogController();

              await templateService.apiHandler({
                methodName: 'getByIdOrSlug',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminBlogController_create: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateBlogArticleDto"},
        };
        app.post('/admin/blogs',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminBlogController)),
            ...(fetchMiddlewares<RequestHandler>(AdminBlogController.prototype.create)),

            async function AdminBlogController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminBlogController_create, request, response });

                const controller = new AdminBlogController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminBlogController_update: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateBlogArticleDto"},
        };
        app.put('/admin/blogs/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminBlogController)),
            ...(fetchMiddlewares<RequestHandler>(AdminBlogController.prototype.update)),

            async function AdminBlogController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminBlogController_update, request, response });

                const controller = new AdminBlogController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminBlogController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/admin/blogs/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminBlogController)),
            ...(fetchMiddlewares<RequestHandler>(AdminBlogController.prototype.delete)),

            async function AdminBlogController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminBlogController_delete, request, response });

                const controller = new AdminBlogController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminBackupController_triggerBackup: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.post('/admin/backup/trigger',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminBackupController)),
            ...(fetchMiddlewares<RequestHandler>(AdminBackupController.prototype.triggerBackup)),

            async function AdminBackupController_triggerBackup(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminBackupController_triggerBackup, request, response });

                const controller = new AdminBackupController();

              await templateService.apiHandler({
                methodName: 'triggerBackup',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminAuditLogController_getAuditLogs: Record<string, TsoaRoute.ParameterSchema> = {
                action: {"in":"query","name":"action","dataType":"string"},
                entityType: {"in":"query","name":"entityType","dataType":"string"},
                entityId: {"in":"query","name":"entityId","dataType":"string"},
                userId: {"in":"query","name":"userId","dataType":"string"},
                search: {"in":"query","name":"search","dataType":"string"},
                startDate: {"in":"query","name":"startDate","dataType":"string"},
                endDate: {"in":"query","name":"endDate","dataType":"string"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                page: {"in":"query","name":"page","dataType":"double"},
        };
        app.get('/admin/audit-logs',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminAuditLogController)),
            ...(fetchMiddlewares<RequestHandler>(AdminAuditLogController.prototype.getAuditLogs)),

            async function AdminAuditLogController_getAuditLogs(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminAuditLogController_getAuditLogs, request, response });

                const controller = new AdminAuditLogController();

              await templateService.apiHandler({
                methodName: 'getAuditLogs',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminAboutUsController_getAdminContent: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/admin/about-us',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminAboutUsController)),
            ...(fetchMiddlewares<RequestHandler>(AdminAboutUsController.prototype.getAdminContent)),

            async function AdminAboutUsController_getAdminContent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminAboutUsController_getAdminContent, request, response });

                const controller = new AdminAboutUsController();

              await templateService.apiHandler({
                methodName: 'getAdminContent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminAboutUsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"UpdateAboutUsDto"},
        };
        app.put('/admin/about-us',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminAboutUsController)),
            ...(fetchMiddlewares<RequestHandler>(AdminAboutUsController.prototype.update)),

            async function AdminAboutUsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminAboutUsController_update, request, response });

                const controller = new AdminAboutUsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminAboutUsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"UpdateAboutUsDto"},
        };
        app.post('/admin/about-us',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminAboutUsController)),
            ...(fetchMiddlewares<RequestHandler>(AdminAboutUsController.prototype.create)),

            async function AdminAboutUsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminAboutUsController_create, request, response });

                const controller = new AdminAboutUsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAboutUsController_getPublicContent: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/about-us',
            ...(fetchMiddlewares<RequestHandler>(AboutUsController)),
            ...(fetchMiddlewares<RequestHandler>(AboutUsController.prototype.getPublicContent)),

            async function AboutUsController_getPublicContent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAboutUsController_getPublicContent, request, response });

                const controller = new AboutUsController();

              await templateService.apiHandler({
                methodName: 'getPublicContent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
