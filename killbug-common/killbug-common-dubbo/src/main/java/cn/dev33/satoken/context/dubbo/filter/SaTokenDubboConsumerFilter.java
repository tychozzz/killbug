package cn.dev33.satoken.context.dubbo.filter;

import cn.dev33.satoken.SaManager;
import cn.dev33.satoken.context.SaTokenContextDefaultImpl;
import cn.dev33.satoken.same.SaSameUtil;
import cn.dev33.satoken.spring.SaBeanInject;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaTokenConsts;
import com.killbug.common.core.utils.SpringUtils;
import org.apache.dubbo.common.constants.CommonConstants;
import org.apache.dubbo.common.extension.Activate;
import org.apache.dubbo.rpc.*;


/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/4 15:02
 */
@Activate(group = {CommonConstants.CONSUMER}, order = Integer.MIN_VALUE)
public class SaTokenDubboConsumerFilter implements Filter {

	@Override
	public Result invoke(Invoker<?> invoker, Invocation invocation) throws RpcException {
        SpringUtils.getBean(SaBeanInject.class);

		if(SaManager.getConfig().getCheckSameToken()) {
            RpcContext.getServiceContext().setAttachment(SaSameUtil.SAME_TOKEN, SaSameUtil.getToken());
		}

		if(SaManager.getSaTokenContextOrSecond() != SaTokenContextDefaultImpl.defaultContext) {
			RpcContext.getServiceContext().setAttachment(SaTokenConsts.JUST_CREATED, StpUtil.getTokenValueNotCut());
		}

		Result invoke = invoker.invoke(invocation);

		StpUtil.setTokenValue(invoke.getAttachment(SaTokenConsts.JUST_CREATED_NOT_PREFIX));

		return invoke;
	}
}
