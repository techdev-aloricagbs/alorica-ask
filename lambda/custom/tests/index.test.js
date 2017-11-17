const alexaTest = require('alexa-skill-test-framework');
var pg = require('pg');

alexaTest.initialize(
  require('../index.js'),
  "amzn1.ask.skill.a34efd2f-c533-49a7-b918-356e8211cafe",
  "amzn1.ask.account.AECSMIDEB6UUVK32Z6O2MEOEDVVEZ527LMBKBOAGV3X7MIWFBIWHC3YMHGEGG7EO7DSOVRAAOU7MSG6KKLHG4G5U4JV4NLYHMEQYHKHEB2TTVTEPONXVWOXKVFBRWB2RZIUXC42QO34JZJJYAGHE7VBKYXA57YORB6XVMJGCBJANWLWHCR5AATA5QLZOSM6NUVAUUNCSNHQBNKY");

describe("Alexa skill using Staging configuration", function() {
  it("can handle LaunchRequest", function(done) {
    alexaTest.test([
      {
        request: alexaTest.getLaunchRequest(),
        says: "Welcome to Alorica", repromptsNothing: true, shouldEndSession: true
      }
    ]);
    done();
  });
  it("can handle CountIntent", function(done) {
    const slot = {'companyMetadata': 'employees', 'siteName': 'fort'};
		const requestWithSlot = alexaTest.getIntentRequest('CountIntent', slot);

		alexaTest.test([
			{
				request: requestWithSlot,
				says: "fort site has 61 employees", shouldEndSession: true, repromptsNothing: true
			}
		]);
    done();
  });
  it("can handle DBIntent", function(done) {
    const slot = {'field': 'name', 'fieldValue': 'john'};
    const requestWithSlot = alexaTest.getIntentRequest('DBIntent', slot);

    alexaTest.test([
      {
        request: requestWithSlot,
        says: "john is around", shouldEndSession: true, repromptsNothing: true
      }
    ]);
    done();

  });
});
