// 1. 푸터를 삽입할 클래스 정의
class FooterHandler {
  element(element) {
    // 삽입하고 싶은 푸터의 전체 HTML 코드를 백틱(`) 안에 작성합니다.
    const footerHTML = `
      <footer class="bg-gray-900 border-t border-gray-800 py-12 mt-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center mb-6">
                  <h3 class="text-white text-xl font-bold">비아몰 (VIAMALL)</h3>
                  <div class="space-x-4 text-sm flex items-center">
                      <a href="/faq" class="hover:text-white transition">FAQ</a>
                      <span class="text-gray-600">|</span>
                      <a href="/terms-of-service" class="hover:text-white transition">이용약관</a>
                      <span class="text-gray-600">|</span>
                      <a href="/privacy-policy" class="hover:text-white transition">개인정보처리방침</a>
                  </div>
              </div>
              <div class="text-gray-400 text-sm space-y-2">
                  <p>상호: 비아몰 (VIAMALL) | 대표자: [대표자명]</p>
                  <p>사업자등록번호: [000-00-00000] | 통신판매업신고: [제0000-0000호]</p>
                  <p>이메일: support@viamallyak.com | 고객센터: 070-0000-0000</p>
                  <p class="pt-4 text-gray-500">© 2026 VIAMALL. All rights reserved.</p>
              </div>
          </div>
      </footer>
    `;
    
    // id="footer-placeholder"인 div 자체를 위의 footerHTML로 완전히 교체(replace)합니다.
    // html: true 옵션을 주어 텍스트가 아닌 실제 HTML 태그로 인식하게 합니다.
    element.replace(footerHTML, { html: true });
  }
}

// 2. 요청을 가로채는 메인 함수
export async function onRequest(context) {
  // 원래 요청한 정적 파일(예: index.html)을 불러옵니다.
  const response = await context.next();

  // 응답이 HTML 문서인지 확인합니다. (이미지나 CSS 파일에는 적용하지 않기 위함)
  const contentType = response.headers.get("content-type");
  
  if (contentType && contentType.includes("text/html")) {
    // HTML 파일이라면 HTMLRewriter를 가동합니다.
    return new HTMLRewriter()
      // HTML 문서 내에서 'div#footer-placeholder' 요소를 찾으면 FooterHandler를 실행합니다.
      .on("div#footer-placeholder", new FooterHandler())
      .transform(response);
  }

  // HTML이 아니라면 원본 그대로 응답합니다.
  return response;
}
