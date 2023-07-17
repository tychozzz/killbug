package cn.dev33.satoken.context.dubbo.filter;

import cn.dev33.satoken.SaManager;
import cn.dev33.satoken.same.SaSameUtil;
import cn.dev33.satoken.spring.SaBeanInject;
import com.killbug.common.core.utils.SpringUtils;
import org.apache.dubbo.common.constants.CommonConstants;
import org.apache.dubbo.common.extension.Activate;
import org.apache.dubbo.rpc.*;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/4 15:03
 */
@Activate(group = {CommonConstants.PROVIDER}, order = Integer.MIN_VALUE)
public class SaTokenDubboProviderFilter implements Filter {

	@Override
	public Result invoke(Invoker<?> invoker, Invocation invocation) throws RpcException {
        SpringUtils.getBean(SaBeanInject.class);

		if(SaManager.getConfig().getCheckSameToken()) {
			String idToken = invocation.getAttachment(SaSameUtil.SAME_TOKEN);
            if(idToken == null) {
                idToken = invocation.getAttachment(SaSameUtil.SAME_TOKEN.toLowerCase());
            }
            SaSameUtil.checkToken(idToken);
		}

		return invoker.invoke(invocation);
	}

}
