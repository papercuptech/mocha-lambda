
declare module 'mocha-lambda' {
	import {
		SuiteFunction,
		PendingSuiteFunction,
		HookFunction,
		TestFunction,
		PendingTestFunction
	} from 'mocha'

	function ctx(globalName?:string):any
	namespace ctx {
		let before: HookFunction;
		let after: HookFunction;
		let beforeEach: HookFunction;
		let afterEach: HookFunction;
		let describe: SuiteFunction;
		let context: SuiteFunction;
		let xdescribe: PendingSuiteFunction;
		let xcontext: PendingSuiteFunction;
		let it: TestFunction;
		let specify: TestFunction;
		let xit: PendingTestFunction;
		let xspecify: PendingTestFunction;
		let suiteSetup: HookFunction;
		let suiteTeardown: HookFunction;
		let setup: HookFunction;
		let teardown: HookFunction;
		let suite: SuiteFunction;
		let test: TestFunction;
	}

	export = ctx
}

declare var _tst:Mocha.Context