import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  transaction_id: string;
}

class DeleteTransactionService {
  public async execute({ transaction_id }: Request): Promise<null> {
    const transactionsRepository = getCustomRepository(TransactionRepository);

    const transaction = await transactionsRepository.findOne({
      id: transaction_id,
    });

    if (!transaction) {
      throw new AppError('Transaction not found');
    }

    await transactionsRepository.remove(transaction);

    return null;
  }
}

export default DeleteTransactionService;
