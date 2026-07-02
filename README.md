# Traffic API Service Module

The **Traffic API Service** acts as the communication layer between the frontend AI Traffic Control System and the backend server. It is responsible for sending traffic information for AI analysis, storing traffic metrics in the database, and retrieving historical optimization records.

---

#  Module Overview

The `trafficApi.ts` service provides a centralized interface for all backend API requests. Instead of making API calls directly from React components, all communication is handled through this service.

This improves:

- Code reusability
- Maintainability
- Error handling
- Separation of concerns

---

#  File Location

```
src/
└── services/
      trafficApi.ts
```

---

#  Responsibilities

The Traffic API Service is responsible for:

- Sending lane information to the AI engine.
- Receiving optimized traffic signal timings.
- Saving traffic metrics into the database.
- Retrieving historical traffic records.
- Handling API communication errors.
- Providing type-safe API responses using TypeScript interfaces.

---

#  Type Definitions

## LaneDirection

Represents the four traffic directions.

```typescript
North
East
South
West
```

Used throughout the project for traffic signal control.

---

## LightState

Represents the current traffic signal state.

Possible values

```typescript
Green
Yellow
Red
```

---

## LaneStatePayload

Represents the information of one traffic lane sent to the AI server.

### Properties

| Property | Description |
|----------|-------------|
| direction | Lane direction |
| light | Current signal color |
| vehicleCount | Number of vehicles |
| density | LOW / MEDIUM / HIGH |
| densityScore | Traffic density percentage |

---

## PredictionData

Stores AI prediction results.

### Properties

| Property | Description |
|----------|-------------|
| lane | Lane direction |
| projectedQueueLength | Predicted queue size |
| confidenceScore | AI confidence level |
| recommendedDuration | Recommended green signal duration |

---

## TrafficAnalysisResponse

Stores the response received from the AI server.

Contains

- AI report
- Predictions
- Optimized timing configuration
- Success status

---

## MetricsSavePayload

Stores traffic metrics before sending them to the database.

Includes

- Vehicle count
- Waiting time
- AI waiting time
- System logs

---

## DBResponse

Represents responses received from the database.

Contains

- Success status
- Record ID
- Timestamp
- Historical records

---

#  API Functions

---

## analyzeTraffic()

### Purpose

Sends live traffic information to the AI server for analysis.

### Input

- Lane information
- Traffic density
- Current signal status
- Emergency vehicle status
- AI prompt

### API Endpoint

```
POST /api/analyze-traffic
```

### Request Flow

```
Dashboard

↓

Traffic Engine

↓

trafficApiService

↓

Backend API

↓

Gemini AI

↓

Optimized Signal Timing

↓

Dashboard
```

### Response

Returns

- AI Report
- Traffic Predictions
- Optimized Signal Timings

---

## saveMetrics()

### Purpose

Stores traffic statistics into the database.

### API Endpoint

```
POST /api/database/save
```

### Data Stored

- Lane vehicle count
- Waiting time
- AI waiting time
- Logs

### Response

Returns

- Success status
- Database Entry ID
- Timestamp

---

## fetchHistory()

### Purpose

Retrieves all previous traffic optimization records.

### API Endpoint

```
GET /api/database/get
```

### Response

Returns

- Historical traffic metrics
- AI optimization history
- Previous database entries

---

#  API Workflow

```
Traffic Dashboard

        │

        ▼

Traffic API Service

        │

 ┌───────────────┐
 │               │
 ▼               ▼

AI Server     Database

 │               │

 ▼               ▼

Analysis     Save Metrics

 │               │

 └──────┬────────┘

        ▼

Frontend Dashboard
```

---

#  Error Handling

The service includes robust error handling for:

- Network failures
- Invalid API responses
- Database errors
- AI service failures
- Empty traffic data

When an error occurs:

- Error is logged.
- User receives a meaningful message.
- Safe fallback response is returned.

---

#  Technologies Used

- TypeScript
- Fetch API
- REST API
- JSON
- React
- Vite

---

#  Advantages

- Centralized API communication.
- Type-safe request and response handling.
- Easy integration with backend services.
- Improved maintainability.
- Simplified debugging.
- Better scalability.

---

#  Future Enhancements

- Real-time WebSocket communication.
- JWT authentication.
- Cloud database integration.
- API request caching.
- Retry mechanism for failed requests.
- AI response streaming.
- Performance monitoring.

---

#  My Contribution

As part of the AI Traffic Management System, I implemented the **Traffic API Service Module**.

My responsibilities included:

- Designing TypeScript interfaces for API communication.
- Implementing AI analysis requests.
- Creating database save functionality.
- Developing history retrieval APIs.
- Implementing error handling.
- Integrating frontend with backend services.
- Maintaining type safety across all API responses.

---

#  Conclusion

The **Traffic API Service Module** serves as the communication bridge between the frontend application, AI analysis engine, and backend database. By centralizing all API requests, the module improves maintainability, scalability, and reliability while enabling intelligent traffic management through AI-assisted decision-making.
