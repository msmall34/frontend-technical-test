import {loadUsers} from '../lib/api'

const mockedUsers = [
  {
    "id": 1,
    "nickname": "Thibaut",
    "token": "xxxx"
  },
  {
    "id": 2,
    "nickname": "Jeremie",
    "token": "xxxx"
  },
  {
    "id": 3,
    "nickname": "Patrick",
    "token": "xxxx"
  },
  {
    "id": 4,
    "nickname": "Elodie",
    "token": "xxxx"
  }
];

// @ts-ignore
global.fetch = jest.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve(mockedUsers)
  })
)


describe('Users', () => {
  it("Should return all users", async () => {
        const users = await loadUsers()
      expect(users).toEqual(mockedUsers);
  })
})


