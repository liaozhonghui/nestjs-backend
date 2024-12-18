import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Equal, Repository } from 'typeorm';
import { isEmpty } from 'bullmq';
import { nanoidId } from 'src/common/utils/nanoid.util';
import { CustomError, ERROR_CODE } from 'src/common/errors/custome-error';
// This should be a real class/interface representing a user entity
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userModel: Repository<User>,
  ) {}
  async list() {
    const users = await this.userModel.find();
    console.log('users:', users);
    return users;
  }
  async login(body: any) {
    const { device_id } = body;

    let inst = await this.userModel.findOne({
      where: {
        device_id: Equal(device_id),
      },
    });
    if (isEmpty(inst)) {
      const createObj = new User();
      Object.assign(createObj, { user_id: nanoidId() }, body);
      inst = await this.userModel.save(createObj);
    }

    return inst;
  }

  async binding(body: any) {
    const { device_id, bind_type, bind_id } = body;

    let inst;
    const [bindInst, deviceIdInst] = await Promise.all([
      await this.userModel.findOne({
        where: {
          bind_type: Equal(bind_type),
          bind_id: Equal(bind_id),
        },
      }),
      await this.userModel.findOne({
        where: {
          device_id: Equal(device_id),
        },
      }),
    ]);
    if (!isEmpty(bindInst)) {
      inst = bindInst;
    } else {
      if (isEmpty(deviceIdInst)) {
        console.log('heheheheh');
        throw new CustomError(ERROR_CODE.USER_NOT_GENERATE, '用户未生成');
      } else if (deviceIdInst.bind_id) {
        throw new CustomError(ERROR_CODE.USER_HAS_BIND, '用户已绑定');
      } else {
        inst = deviceIdInst;
      }
    }
    console.log('hahahaha');
    const pickInfo = [
      'bind_id',
      'bind_type',
      'bind_info',
      'nickname',
      'avatar',
    ].reduce((tmp, key) => {
      tmp[key] = body[key] ?? null;
      return tmp;
    }, {});
    Object.assign(inst, pickInfo);
    const res = await this.userModel.save(inst);
    return res;
  }

  async getUserInfo(id) {
    return this.userModel.findOne({ where: { id: Equal(id) } });
  }
}
