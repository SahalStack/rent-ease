import test from "node:test";
import assert from "node:assert/strict";
import { assertCancellable, assertValidOrderId } from "../services/orderService.js";

const VALID_ID = "6ad8c7e0be8e1128eba676de";

test("assertValidOrderId accepts a mongo object id", () => {
	assert.doesNotThrow(() => assertValidOrderId(VALID_ID));
});

test("assertValidOrderId rejects a malformed id", () => {
	assert.throws(() => assertValidOrderId("not-an-id"), {
		statusCode: 400,
		message: "Invalid order id",
	});
});

test("assertValidOrderId rejects an empty id", () => {
	assert.throws(() => assertValidOrderId(""), { statusCode: 400 });
});

test("assertCancellable accepts a pending order", () => {
	assert.doesNotThrow(() => assertCancellable({ orderStatus: "pending" }));
});

test("assertCancellable rejects a missing order", () => {
	assert.throws(() => assertCancellable(null), {
		statusCode: 404,
		message: "Order not found",
	});
});

test("assertCancellable rejects an order that is not pending", () => {
	for (const orderStatus of ["active", "completed", "cancelled"]) {
		assert.throws(() => assertCancellable({ orderStatus }), {
			statusCode: 400,
			message: "Only pending orders can be cancelled",
		});
	}
});
