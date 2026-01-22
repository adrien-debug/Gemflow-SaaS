import { useState, useRef, useEffect } from "react";
import { Button, Input, List, Typography, Tag, Spin, Space, Badge } from "antd";
import { SendOutlined, RobotOutlined, CloseOutlined, MessageOutlined } from "@ant-design/icons";
import { useAiAgentQuery } from "@entities/ai-agent/hooks/useAiAgentQuery";
import type { AiAgentResponse } from "@entities/ai-agent/models/ai-agent.model";
import "./styles.scss";

const { TextArea } = Input;
const { Text, Paragraph } = Typography;

interface ChatMessage {
  id: string;
  type: "user" | "agent";
  content: string;
  response?: AiAgentResponse;
  timestamp: Date;
}

export const AiAgentFloatingWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiQuery = useAiAgentQuery();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasNewMessage(false);
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      const response = await aiQuery.mutateAsync({ query: inputValue });

      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: response.response,
        response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMessage]);

      if (!isOpen) {
        setHasNewMessage(true);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  return (
    <div className="ai-agent-floating-widget">
      {/* Chat Popup */}
      {isOpen && (
        <div className="ai-agent-floating-popup">
          <div className="popup-header">
            <Space>
              <RobotOutlined />
              <span>Assistant IA</span>
            </Space>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={handleToggle}
              className="close-button"
            />
          </div>

          <div className="popup-content">
            {messages.length === 0 ? (
              <div className="empty-state">
                <RobotOutlined className="empty-icon" />
                <Paragraph>
                  Bonjour ! Je suis votre assistant IA.
                  <br />
                  Comment puis-je vous aider ?
                </Paragraph>
              </div>
            ) : (
              <List
                dataSource={messages}
                renderItem={(message) => (
                  <List.Item
                    className={`message-item ${message.type}`}
                  >
                    <div className={`message-bubble ${message.type}`}>
                      {message.type === "agent" && message.response?.type && (
                        <Tag
                          color={
                            message.response.type === "alert"
                              ? "red"
                              : message.response.type === "data"
                                ? "blue"
                                : "green"
                          }
                          style={{ marginBottom: 8 }}
                        >
                          {message.response.type}
                        </Tag>
                      )}
                      <Paragraph className="message-text">
                        {message.content}
                      </Paragraph>
                      {message.response?.suggestions && message.response.suggestions.length > 0 && (
                        <div className="suggestions">
                          <Text type="secondary" style={{ fontSize: 11 }}>
                            Suggestions :
                          </Text>
                          <Space wrap style={{ marginTop: 4 }}>
                            {message.response.suggestions.map((suggestion, idx) => (
                              <Button
                                key={idx}
                                size="small"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </Space>
                        </div>
                      )}
                    </div>
                  </List.Item>
                )}
              />
            )}
            {aiQuery.isPending && (
              <div className="loading-state">
                <Spin size="small" />
                <Text type="secondary">Réflexion...</Text>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="popup-footer">
            <Space.Compact style={{ width: "100%" }}>
              <TextArea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Votre question..."
                autoSize={{ minRows: 1, maxRows: 3 }}
                disabled={aiQuery.isPending}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSend}
                loading={aiQuery.isPending}
                disabled={!inputValue.trim()}
              />
            </Space.Compact>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <Badge dot={hasNewMessage} offset={[-4, 4]}>
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={isOpen ? <CloseOutlined /> : <MessageOutlined />}
          onClick={handleToggle}
          className="floating-button"
        />
      </Badge>
    </div>
  );
};

export default AiAgentFloatingWidget;
