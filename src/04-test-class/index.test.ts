import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000);
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1000);
    expect(() => account.withdraw(1010)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(1000);
    const difAccount = getBankAccount(10);
    expect(() => account.transfer(1010, difAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);
    expect(() => account.transfer(10, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);
    account.deposit(10);
    expect(account.getBalance()).toBe(1010);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    account.withdraw(10);
    expect(account.getBalance()).toBe(990);
  });

  test('should transfer money', () => {
    const account = getBankAccount(1000);
    const difAccount = getBankAccount(10);
    account.transfer(90, difAccount);
    expect(account.getBalance()).toBe(910);
    expect(difAccount.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(500);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 500;
    const account = getBankAccount(1000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(1000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
