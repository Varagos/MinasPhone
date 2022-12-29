function sum(a: number, b: number): number {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// describe('makeOffer', () => {
//   describe(`Given a vinyl exists and is available for trade`, () => {
//     describe(`When a trader wants to place an offer using money`, () => {
//       test(`Then the offer should get created and an
//       email should be sent to the vinyl owner`, async () => {
//         // Collaborator #1 - Should be a stub object.
//         // We have to provide an implementation otherwise
//         // we'll get a compilation error.
//         let fakeVinylRepo: IVinylRepo = {
//           getVinylOwner: jest.fn(async (vinylId: string) => {
//             return { id: '4', name: 'Jim' };
//           }),
//           isVinylAvailableForTrade: jest.fn(async (vinylId: string) => {
//             return true;
//           }),
//         };

//         // Collaborator #2 - should be a mock
//         // Unfortunately, we also need to provide an implementation of the
//         // interface.
//         let mockTradesRepo: ITradesRepo = {
//           saveOffer: jest.fn(async (offer) => {
//             return;
//           }),
//         };

//         // Collaborator #3 - should also be a mock object
//         // Again, implementation required.
//         let mockNotificationService: INotificationService = {
//           sendEmail: jest.fn(async (email) => {
//             return;
//           }),
//         };

//         let makeOffer = new MakeOffer(
//           fakeVinylRepo,
//           mockTradesRepo,
//           mockNotificationService,
//         );

//         let result = await makeOffer.execute({
//           vinylId: '123',
//           tradeType: 'money',
//           amountInCents: 100 * 35,
//         });

//         // We are confirming that the two command-like operations
//         // have been called by looking commands invoked on the mocks.
//         expect(mockTradesRepo.save).toHaveBeenCalled();
//         expect(mockNotificationService.sendEmail).toHaveBeenCalled();
//       });
//     });
//   });
// });
